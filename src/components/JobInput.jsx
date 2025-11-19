import React from 'react';
import { Briefcase } from 'lucide-react';

const JobInput = ({ value, onChange }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accentMuted text-accentPrimary">
          <Briefcase className="w-5 h-5" />
        </div>
        <span className="text-sm font-bold font-ui text-textSecondary uppercase tracking-wider">Job Description</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full flex-1 bg-surface text-textPrimary p-4 rounded-xl border border-inputBorder resize-none focus:outline-none focus:border-inputBorderFocus focus:ring-1 focus:ring-inputBorderFocus placeholder-inputPlaceholder leading-relaxed font-body transition-all duration-300"
      />
    </div>
  );
};

export default JobInput;
