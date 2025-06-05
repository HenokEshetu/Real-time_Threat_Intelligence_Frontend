import React, { useEffect, useState } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
  useQuery,
  gql,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloProvider } from '@apollo/client';

// Import shadcn/ui table components
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const httpLink = new HttpLink({
  uri: 'http://10.161.173.239:8000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://10.161.173.239:8000/graphql',
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const GET_RULES = gql`
  query {
    rules {
      sid
      rule
    }
  }
`;

const RULES_SUBSCRIPTION = gql`
  subscription {
    rules {
      sid
      rule
    }
  }
`;

const ADD_RULE = gql`
  mutation AddRule($observableType: String!, $observableValue: String!) {
    addRule(
      input: {
        observableType: $observableType
        observableValue: $observableValue
      }
    ) {
      sid
      rule
    }
  }
`;

export function useRules() {
  const { data, loading, error, subscribeToMore } = useQuery(GET_RULES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: RULES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // Replace the rules array with the latest from the subscription
        return {
          ...prev,
          rules: subscriptionData.data.rules,
        };
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);

  return {
    rules: data?.rules ?? [],
    loading,
    error,
  };
}

function RulesList() {
  const { rules, loading, error } = useRules();
  const [open, setOpen] = useState(false);
  const [sid, setSid] = useState('');
  const [rule, setRule] = useState('');
  const [addRule, { loading: adding }] = useMutation(ADD_RULE, {
    refetchQueries: [{ query: GET_RULES }],
  });

  if (loading)
    return (
      <div className="w-full px-4 py-6 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  if (error)
    return toast.error('IDS/IPS goes offline', {
      description: error?.message,
    });

  function getActionClass(rule: string) {
    const action = rule.split(' ')[0].toLowerCase();
    if (action === 'alert') return 'text-teal-600 font-semibold';
    if (action === 'drop') return 'text-amber-600 font-semibold';
    return '';
  }

  function handleAddClick() {
    setSid('');
    setRule('');
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const observableType = 'domain-name';
    const observableValue = rule;

    addRule({
      variables: {
        observableType,
        observableValue,
      },
    }).finally(() => {
      setOpen(false);
      setSid('');
      setRule('');
    });
  }

  return (
    <div className="flex justify-center p-4">
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>List of IDS/IPS rules</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">SID</TableHead>
              <TableHead>Rule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((r: { sid: string; rule: string }, idx: number) => (
              <TableRow
                key={idx}
                className="hover:bg-slate-100 transition-colors border-b border-gray-300"
              >
                <TableCell className="font-medium text-foreground py-4">
                  {r.sid}
                </TableCell>
                <TableCell className="break-all whitespace-pre-line">
                  <span className={`font-mono py-4 ${getActionClass(r.rule)}`}>
                    {r.rule}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg w-13 h-13 text-3xl cursor-pointer bg-sky-500"
          onClick={handleAddClick}
        >
          +
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Rule</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="sid">SID</Label>
              <Input
                id="sid"
                value={sid}
                onChange={(e) => setSid(e.target.value)}
                required
                placeholder="Enter SID"
              />
            </div>
            <div>
              <Label htmlFor="rule">Rule</Label>
              <Input
                id="rule"
                value={rule}
                onChange={(e) => setRule(e.target.value)}
                required
                placeholder='e.g. alert ip any any -> any any (msg:"..."; sid:...;)'
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add Rule</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const IdsIpsRulesPage = () => {
  return (
    <ApolloProvider client={client}>
      <RulesList />
    </ApolloProvider>
  );
};
