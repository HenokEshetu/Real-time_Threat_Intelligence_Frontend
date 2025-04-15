import React from 'react';
import classNames from 'classnames';  // Re-enable this to handle conditional class names
import './Badge.css';  // Optional styling
// import { ClassNames } from '@emotion/react'; // Not necessary for this use case

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
  return (
    <span className={classNames('badge', variant, className)}>
      {children}
    </span>
  );
};

export default Badge;
