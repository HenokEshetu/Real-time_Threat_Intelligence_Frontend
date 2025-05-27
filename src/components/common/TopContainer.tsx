import React from 'react';

export const TopContainer = ({
  className = '',
  children,
}: {
  className: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex items-center bg-background sticky top-17 z-10 
        left-[var(--sidebar-width)] 
        w-[calc(100%-var(--sidebar-width))] 
        p-3 md:p-5 ${className}`}
    >
      {children}
    </div>
  );
};
