import React from 'react';

const JobInput = ({ value, onChange }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the full job description here..."
        className="w-full min-h-[200px] bg-backgroundAlt text-textPrimary p-6 rounded-2xl border border-borderMedium resize-y focus:outline-none focus:border-accentPrimary focus:ring-4 focus:ring-accentPrimary/10 placeholder-textTertiary/70 leading-relaxed font-body transition-all duration-300 text-base shadow-inner"
      />
      <div className="flex justify-end mt-2">
        <span className="text-xs font-ui text-textTertiary font-medium">
          {value.length} characters
        </span>
      </div>
    </div>
  );
};

export default JobInput;
