// components/ui/grid.tsx
import React from 'react';
import { cn } from '@/lib/utils';

type GridProps = {
  container?: boolean;
  item?: boolean;
  cols?: number | string;
  gap?: number | string;
  className?: string;
  children: React.ReactNode;
};

export function Grid({
  container = true,
  item = false,
  cols,
  gap,
  className,
  children,
}: GridProps) {
  const classes = cn(
    container && 'grid',
    container &&
      cols &&
      (typeof cols === 'number' ? `grid-cols-${cols}` : cols),
    container && gap && (typeof gap === 'number' ? `gap-${gap}` : gap),
    item && cols && (typeof cols === 'number' ? `col-span-${cols}` : cols),
    className,
  );

  return <div className={classes}>{children}</div>;
}
