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
    <div className="w-full">
      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full border-2 border-dashed border-borderMedium rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-accentPrimary hover:bg-accentMuted/10 transition-all duration-300 cursor-pointer group bg-backgroundAlt/50"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-sm border border-borderLight">
              <Upload className="w-8 h-8 text-accentPrimary group-hover:text-accentSecondary transition-colors" />
            </div>
            <h3 className="text-xl font-bold font-heading text-textPrimary mb-2">Click or Drag Resume PDF</h3>
            <p className="text-sm font-ui text-textSecondary group-hover:text-accentSecondary transition-colors max-w-xs mx-auto leading-relaxed">
              Upload your resume in PDF format to get started with the analysis
            </p>
          </label>
        </div>
      ) : (
        <div className="w-full bg-backgroundAlt rounded-2xl p-6 flex items-center gap-6 border border-borderMedium relative group hover:border-accentPrimary/30 transition-colors">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-borderLight flex-shrink-0">
            <FileText className="w-8 h-8 text-accentPrimary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold font-heading text-textPrimary truncate">{file.name}</h3>
            <p className="text-sm font-ui text-textSecondary mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          
          <button
            onClick={onClear}
            className="p-3 hover:bg-error/10 rounded-xl transition-colors text-textTertiary hover:text-error group-hover:opacity-100"
            title="Remove file"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
