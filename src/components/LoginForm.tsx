import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { GoogleIcon } from './common/GoogleIcon';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormValues {
  email: string;
  password: string;
}

const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
};

const passwordValidation = {
  required: 'Password is required',
  // minLength: { value: 8, message: 'Password must be at least 8 characters' },
  // validate: (value: string) => {
  //   if (!/[A-Z]/.test(value)) return 'Requires at least one uppercase letter';
  //   if (!/[a-z]/.test(value)) return 'Requires at least one lowercase letter';
  //   if (!/[0-9]/.test(value)) return 'Requires at least one number';
  //   return true;
  // },
};

const ErrorMessage = ({
  error,
  id,
}: {
  error?: { message?: string };
  id?: string;
}) =>
  error?.message ? (
    <span id={id} role="alert" className="text-red-600 text-sm mt-1 block">
      {error.message}
    </span>
  ) : null;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    setError,
  } = useForm<LoginFormValues>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const { login, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setFormError(null);
      await login(values.email, values.password);
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please try again.',
      });
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-l-2xl w-[50%] h-full',
        className,
      )}
      {...props}
    >
      <Card className="w-full h-full lg:px-10 lg:py-20 shadow-none rounded-none rounded-l-2xl flex flex-col items-center justify-center">
        <CardHeader className="w-[80%]">
          <CardTitle className="text-4xl text-center py-4">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="w-[80%]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              {/* Form Error Message */}
              {errors.root && (
                <div className="text-red-600 text-sm text-center">
                  {errors.root.message}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  {...register('email', emailValidation)}
                />
                <ErrorMessage error={errors.email} id="email-error" />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    type="button"
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  {...register('password', passwordValidation)}
                />
                <ErrorMessage error={errors.password} id="password-error" />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || (!isValid && isDirty)}
                className="w-full font-semibold"
                aria-live="polite"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button
                variant="link"
                className="underline-offset-4 px-0"
                type="button"
                onClick={() => navigate('/signup')}
                disabled={isLoading}
              >
                Sign up
              </Button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}