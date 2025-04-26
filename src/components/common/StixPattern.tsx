import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Code } from '@/components/ui/code';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  Copy,
  Eye,
  EyeOff,
  Search,
  ZoomIn,
  ZoomOut,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ParsedPatternViewerProps {
  pattern: string;
}

interface ParsedPatternViewerProps {
  pattern: string;
}

interface KeyValue {
  key: string;
  value: string;
}
// ... (keep previous interfaces and utility functions)

export function StixPattern({ pattern }: ParsedPatternViewerProps) {
  const [showHex, setShowHex] = useState(false);
  const [showSensitive, setShowSensitive] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState<
    'meta' | 'strings' | 'condition' | null
  >(null);

  // Add these new parsing functions
  const { meta, hashes, strings, condition, highlighted, ruleName, lines } =
    useMemo(() => {
      // Parse the pattern
      const ruleMatch = pattern.match(/rule\s+(\w+)/i);
      const ruleName = ruleMatch ? ruleMatch[1] : 'Unnamed Rule';

      const firstBrace = pattern.indexOf('{');
      const lastBrace = pattern.lastIndexOf('}');
      const content =
        firstBrace !== -1 && lastBrace !== -1
          ? pattern.slice(firstBrace + 1, lastBrace)
          : pattern;

      // Extract key/value pairs
      const kvRe = /([A-Za-z0-9_]+)\s*=\s*"([^\"]+)"/g;
      const allKvs: KeyValue[] = [];
      let m: RegExpExecArray | null;
      while ((m = kvRe.exec(content))) {
        allKvs.push({ key: m[1], value: m[2] });
      }

      const metaKeys = new Set([
        'Author',
        'Incident',
        'Date',
        'Last_Modified',
        'Actor',
        'Category',
        'Family',
        'Description',
      ]);
      const meta: KeyValue[] = [];
      const hashes: KeyValue[] = [];
      allKvs.forEach(({ key, value }) => {
        if (/^MD5_/i.test(key) || /^SHA256_/i.test(key))
          hashes.push({ key, value });
        else if (metaKeys.has(key)) meta.push({ key, value });
      });

      // Strings
      const stringsRe = /strings\s*:\s*([\s\S]*?)condition\s*:/i;
      const stringsSection = stringsRe.exec(content)?.[1] || '';
      const strRe = /\$(\w+)\s*=\s*\{([^}]+)\}/g;
      const strings: string[] = [];
      while ((m = strRe.exec(stringsSection)))
        strings.push(`$${m[1]} = {${m[2].trim()}}`);

      // Condition
      const condition = (
        /condition\s*:\s*([\s\S]*)$/i.exec(content)?.[1] || ''
      ).trim();

      // Syntax highlighting
      let highlighted = pattern
        .replace(
          /indicator:pattern/gi,
          '<span class="text-amber-600 font-bold">indicator:pattern</span>',
        )
        .replace(
          /rule\s+\w+/gi,
          (pub) => `<span class="text-blue-500 font-semibold">${pub}</span>`,
        )
        .replace(
          /(meta|strings|condition):/gi,
          '<span class="text-purple-500 font-semibold">$1:</span>',
        )
        .replace(/(\$[a-z0-9]+)/gi, '<span class="text-green-500">$1</span>');
      // New line numbers calculation
      const lines = pattern.split('\n');

      return { meta, hashes, strings, condition, highlighted, ruleName, lines };
    }, [pattern]);

  // New highlight matches function
  const highlightMatches = (text: string) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(
      regex,
      '<span class="bg-yellow-200 text-black">$1</span>',
    );
  };

  return (
    <Card className="!shadow-none bg-transparent border-0 p-0">
      <CardContent className="bg-transparent p-0">
        <div className="relative space-y-4">
          <ScrollArea className="max-h-30 bg-transparent">
            <div className="flex">
              <Code
                className="whitespace-pre-wrap flex-1 overflow-auto bg-transparent"
                style={{ fontSize: `${fontSize}px` }}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className="text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatches(highlighted.split('\n')[i]),
                    }}
                  />
                ))}
              </Code>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
