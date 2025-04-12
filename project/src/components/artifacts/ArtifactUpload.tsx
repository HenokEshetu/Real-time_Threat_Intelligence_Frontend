import { useState } from 'react';

interface ArtifactUploadProps {
  onFileUpload: (file: File) => void;
  onUrlChange: (url: string) => void;
  currentValue: 'file' | 'url' | '';
}

export const ArtifactUpload = ({ onFileUpload, onUrlChange, currentValue }: ArtifactUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileUpload(selectedFile);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);
    onUrlChange(value);
  };

  return (
    <div className="artifact-upload">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="contentSource"
          id="fileUpload"
          checked={currentValue === 'file'}
          onChange={() => {}}
        />
        <label className="form-check-label" htmlFor="fileUpload">
          Upload File
        </label>
      </div>
      
      {currentValue === 'file' && (
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} className="form-control" />
          {file && <div className="file-info">Selected: {file.name}</div>}
        </div>
      )}

      <div className="form-check mt-3">
        <input
          className="form-check-input"
          type="radio"
          name="contentSource"
          id="urlInput"
          checked={currentValue === 'url'}
          onChange={() => {}}
        />
        <label className="form-check-label" htmlFor="urlInput">
          Enter URL
        </label>
      </div>

      {currentValue === 'url' && (
        <div className="url-input">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com/file.txt"
            className="form-control"
          />
        </div>
      )}
    </div>
  );
};