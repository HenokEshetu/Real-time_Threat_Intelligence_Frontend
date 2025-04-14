import React from 'react';
import classNames from 'classnames';
import './badge.css'; // optional styling, or you can use Tailwind or inline styles

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
