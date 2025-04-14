import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EntityCard.module.css'; // Optional CSS module
import { Badge } from '@/components/ui/badge'; // Optional UI component

// Add properties for title, subtitle, description, actions, etc.
export interface EntityCardProps {
  id: string;
  name?: string;
  description?: string;
  created: string;
  labels?: string[];
  icon?: React.ReactNode;
  entityType: string; // e.g., "artifacts", "malware"
  title: string; // New property for title
  subtitle: string; // New property for subtitle
  actions: { label: string; to: string }[]; // New property for actions
  children?: React.ReactNode; // Allow children to be passed
}

export const EntityCard: React.FC<EntityCardProps> = ({
  id,
  name,
  description,
  created,
  labels = [],
  icon,
  entityType,
  title,
  subtitle,
  actions,
  children, // Now accepting children
}) => {
  return (
    <Link to={`/${entityType}/${id}`} className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <h3 className={styles.name}>{title || 'Unnamed Entity'}</h3> {/* Use title */}
        <p className={styles.subtitle}>{subtitle}</p> {/* Use subtitle */}
        <p className={styles.description}>{description}</p>
        <div className={styles.labels}>
          {labels.map((label) => (
            <Badge key={label} variant="secondary" className="mr-1">
              {label}
            </Badge>
          ))}
        </div>
        <div className={styles.created}>Created: {new Date(created).toLocaleDateString()}</div>
        {/* Render actions */}
        <div className={styles.actions}>
          {actions.map((action) => (
            <Link key={action.to} to={action.to} className="btn btn-link">
              {action.label}
            </Link>
          ))}
        </div>
        {/* Render children */}
        {children}
      </div>
    </Link>
  );
};
