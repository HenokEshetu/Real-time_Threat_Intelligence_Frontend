import React from 'react';

export const ContentViewer = ({ content, mimeType, url }) => {
  const renderContent = () => {
    if (content) {
      if (mimeType === 'application/json') {
        try {
          const json = JSON.parse(atob(content));
          return (
            <pre className="json-viewer">
              {JSON.stringify(json, null, 2)}
            </pre>
          );
        } catch {
          return <div className="text-viewer">{atob(content)}</div>;
        }
      } else if (mimeType.startsWith('text/')) {
        return <div className="text-viewer">{atob(content)}</div>;
      } else if (mimeType.startsWith('application/')) {
        return (
          <div className="binary-viewer">
            <p>Binary content - {content.length} bytes</p>
            <button className="btn btn-sm btn-outline-secondary">
              Download
            </button>
          </div>
        );
      }
    } else if (url) {
      return (
        <div className="url-viewer">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      );
    } else {
      return <div className="no-content">No content available</div>;
    }
  };

  return (
    <div className="content-viewer">
      {renderContent()}
    </div>
  );
};
