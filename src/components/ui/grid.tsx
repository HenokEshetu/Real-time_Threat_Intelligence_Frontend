// components/ui/grid.tsx
import React from 'react';
import { cn } from '@/lib/utils';

type GridProps = {
  container?: boolean;
  item?: boolean;
  cols?: number; // Number of columns to span (1-12)
  gap?: number; // Gap between grid items
  className?: string;
  children: React.ReactNode;
};

export function Grid({
  container,
  item,
  cols,
  gap,
  className,
  children,
}: GridProps) {
  const baseClass = cn(
    container ? `grid gap-${gap}` : '',
    item && cols ? `col-span-${cols}` : '',
    className,
  );

  return <div className={baseClass}>{children}</div>;
}
