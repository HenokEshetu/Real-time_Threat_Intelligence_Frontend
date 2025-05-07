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

export function LoginCard({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col bg-white gap-6 rounded-r-2xl w-[50%] h-full border-y border-r border-gray-200 items-center justify-start bg-[url(src/static/images/cover-2.png)] bg-center bg-contain bg-no-repeat',
        className,
      )}
      {...props}
    >
        {/* <Label className="text-8xl font-bold">ዳጉ</Label>
      <Label className="text-xl font-normal">
        Real-time Cyber Threat Intelligence Platform
      </Label> */}
        {/* <img
          src="src/static/images/favicon.png"
          className="w-full h-full"
        /> */}
    </div>
  );
}
