import React, { useState, useEffect } from 'react';
import './ContentUpload.css';

export const ContentUpload = ({
  onFileUpload,
  onUrlChange,
  currentValue,
  label = 'Content Source',
}) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (currentValue === 'file') {
      setUrl('');
    } else if (currentValue === 'url') {
      setFile(null);
    }
  }, [currentValue]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);
    onUrlChange(value);
  };

  return (
    <div className="content-upload">
      <label className="content-upload-label">{label}</label>

      <div className="content-upload-radio">
        <input
          type="radio"
          id="fileUpload"
          name="contentSource"
          checked={currentValue === 'file'}
          onChange={() => {
            setUrl('');
            onUrlChange('');
          }}
        />
        <label htmlFor="fileUpload">Upload File</label>
      </div>

      {currentValue === 'file' && (
        <div className="content-upload-input">
          <input type="file" onChange={handleFileChange} />
          {file && <div className="content-upload-info">Selected: {file.name}</div>}
        </div>
      )}

      <div className="content-upload-radio">
        <input
          type="radio"
          id="urlInput"
          name="contentSource"
          checked={currentValue === 'url'}
          onChange={() => {
            setFile(null);
            onFileUpload(null);
          }}
        />
        <label htmlFor="urlInput">Enter URL</label>
      </div>

      {currentValue === 'url' && (
        <div className="content-upload-input">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/sample.txt"
          />
        </div>
      )}
    </div>
  );
};
