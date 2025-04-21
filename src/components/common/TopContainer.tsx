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
      className={`flex items-center bg-background sticky top-17 z-40 w-490 left-50 p-5 ${className}`}
    >
      {children}
    </div>
  );
};
