import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.alert} role="alert">
        {message}
      </div>
    </div>
  );
};