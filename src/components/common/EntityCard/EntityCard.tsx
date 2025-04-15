import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EntityCard.module.css';
// import { Badge } from '@/components/ui/Badge';

export interface EntityCardProps {
  id: string;
  name?: string;
  description?: string;
  created: string;
  labels?: string[];
  icon?: React.ReactNode;
  entityType: string;
  title: string;
  subtitle: string;
  actions?: { label: string; to?: string; onClick?: () => void }[]; // Allow 'to' or 'onClick'
  children?: React.ReactNode;
  metadata?: Record<string, string>; // Add metadata property
}

export const EntityCard: React.FC<EntityCardProps> = ({
  id,
  description,
  created,
  labels = [],
  icon,
  entityType,
  title,
  subtitle,
  actions = [],
  children,
  metadata, // Include metadata in props
}) => {
  return (
    <Link to={`/${entityType}/${id}`} className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <h3 className={styles.name}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        {description && <p className={styles.description}>{description}</p>}
        {labels.length > 0 && (
          <div className={styles.labels}>
            {/* {labels.map((label) => (
              <Badge key={label} variant="secondary" className="mr-1">
                {label}
              </Badge>
            ))} */}
          </div>
        )}
        {created && (
          <div className={styles.created}>
            Created: {new Date(created).toLocaleDateString()}
          </div>
        )}
        {metadata && (
          <div className={styles.metadata}>
            <h4>Metadata</h4>
            <ul>
              {Object.entries(metadata).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        {actions.length > 0 && (
          <div className={styles.actions}>
            {actions.map((action, index) =>
              action.to ? (
                <Link key={index} to={action.to} className="btn btn-link">
                  {action.label}
                </Link>
              ) : (
                <button key={index} onClick={action.onClick} className="btn btn-link">
                  {action.label}
                </button>
              )
            )}
          </div>
        )}
        {children}
      </div>
    </Link>
  );
};
