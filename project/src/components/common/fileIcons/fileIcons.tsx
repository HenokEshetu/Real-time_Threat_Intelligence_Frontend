import React from 'react';
import { FaFileAlt, FaFileCode, FaFileImage, FaFileArchive, FaFilePdf } from 'react-icons/fa';
import { SiJson } from 'react-icons/si';
import styles from './fileIcons.module.css';

export const getFileIcon = (mimeType: string) => {
  const iconClasses = `${styles.icon} ${styles[mimeType.replace('/', '-')] || styles.default}`;
  
  switch (mimeType) {
    case 'application/json':
      return <SiJson className={iconClasses} />;
    case 'application/pdf':
      return <FaFilePdf className={iconClasses} />;
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
      return <FaFileImage className={iconClasses} />;
    case 'application/zip':
    case 'application/x-tar':
    case 'application/x-rar-compressed':
      return <FaFileArchive className={iconClasses} />;
    case 'text/plain':
      return <FaFileAlt className={iconClasses} />;
    case 'text/html':
    case 'application/xml':
      return <FaFileCode className={iconClasses} />;
    default:
      return <FaFileAlt className={iconClasses} />;
  }
};