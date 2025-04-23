import React from 'react';
import styles from './EntityDetail.module.css';
import { Shield } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

export const EntityDetail = ({
  id,
  name,
  description,
  created,
  modified,
  type,
  icon,
  metadata,
  hashes,
  children,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {icon && icon == 'shield' ? <Shield /> : ''}
      </h2>

      <div className={styles.section}>
        <h3>Metadata</h3>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{id}</td>
            </tr>
            {created && (
              <tr>
                <th>Created</th>
                <td>{new Date(created).toLocaleString()}</td>
              </tr>
            )}
            {modified && (
              <tr>
                <th>Modified</th>
                <td>{new Date(modified).toLocaleString()}</td>
              </tr>
            )}
            {metadata &&
              Object.entries(metadata).map(([key, value]) => (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            {hashes && (
              <tr>
                <th>Hashes</th>
                <td>
                  {Object.entries(hashes).map(([algo, hash]) => (
                    <div key={algo}>
                      <strong>{algo}:</strong> {hash}
                    </div>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {description && (
        <div className={styles.section}>
          <h3>Description</h3>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {description}
          </ReactMarkdown>
        </div>
      )}

      {children && (
        <div className={styles.section}>
          <h3>Content</h3>
          {children}
        </div>
      )}
    </div>
  );
};
