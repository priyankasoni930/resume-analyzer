import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';

const FileUpload = ({ onFileUpload, file, onClear }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      onFileUpload(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="w-full h-full">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="h-full border-2 border-dashed border-borderDefault rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-accentPrimary/50 hover:bg-accentMuted/30 transition-all duration-300 cursor-pointer group"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
            <div className="w-16 h-16 bg-accentMuted rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-accentTertiary/20 transition-all duration-300 shadow-sm">
              <Upload className="w-8 h-8 text-accentPrimary" />
            </div>
            <h3 className="text-lg font-bold font-heading text-textPrimary mb-2">Upload Resume</h3>
            <p className="text-sm font-ui text-textSecondary group-hover:text-accentSecondary transition-colors">
              Drag & drop PDF or click to browse
            </p>
          </label>
        </div>
      ) : (
        <div className="h-full bg-surface rounded-xl p-6 flex flex-col items-center justify-center border border-borderDefault relative group">
          <div className="w-16 h-16 bg-accentMuted rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <FileText className="w-8 h-8 text-accentPrimary" />
          </div>
          <h3 className="text-lg font-bold font-heading text-textPrimary text-center break-all px-4">{file.name}</h3>
          <p className="text-sm font-ui text-textSecondary mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          
          <button
            onClick={onClear}
            className="absolute top-2 right-2 p-2 hover:bg-surfaceHover rounded-full transition-colors text-textSecondary hover:text-textPrimary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
