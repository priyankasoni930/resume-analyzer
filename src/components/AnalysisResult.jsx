import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Award } from 'lucide-react';

const ScoreGauge = ({ score }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-borderLight"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className={`${
            score >= 80 ? 'text-success' : score >= 60 ? 'text-warning' : 'text-error'
          }`}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold font-heading text-textPrimary tracking-tighter">{score}</span>
        <span className="text-[10px] font-bold font-ui text-textTertiary tracking-widest uppercase">Match</span>
      </div>
    </div>
  );
};

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { score, matchedSkills, missingSkills, suggestions } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Score Card */}
      <div className="md:col-span-1 bg-surface rounded-3xl p-8 border border-borderDefault flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-accentMuted/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <ScoreGauge score={score} />
        <div className="mt-6 text-center relative z-10">
          <h3 className="text-2xl font-bold font-heading text-textPrimary mb-1">
            {score >= 80 ? 'Excellent Match' : score >= 60 ? 'Good Potential' : 'Needs Work'}
          </h3>
          <p className="text-sm font-ui text-textSecondary uppercase tracking-wider">Match Score</p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="md:col-span-2 space-y-6">
        <div className="bg-surface rounded-3xl p-8 border border-borderDefault hover:border-borderMedium transition-colors shadow-lg">
          <h3 className="text-xl font-bold font-heading text-textPrimary mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accentMuted text-accentPrimary">
              <Award className="w-5 h-5" />
            </div>
            Skills Breakdown
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold font-ui text-success mb-3 flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle className="w-4 h-4" /> Matched Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, i) => (
                  <span key={i} className="px-4 py-1.5 bg-success/10 text-success rounded-full text-sm font-medium border border-success/20 shadow-sm hover:bg-success/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold font-ui text-error mb-3 flex items-center gap-2 uppercase tracking-wider">
                <XCircle className="w-4 h-4" /> Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, i) => (
                  <span key={i} className="px-4 py-1.5 bg-error/10 text-error rounded-full text-sm font-medium border border-error/20 shadow-sm hover:bg-error/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-surface rounded-3xl p-8 border border-borderDefault hover:border-borderMedium transition-colors shadow-lg">
          <h3 className="text-xl font-bold font-heading text-textPrimary mb-6 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accentMuted text-accentPrimary">
              <AlertCircle className="w-5 h-5" />
            </div>
            Improvement Plan
          </h3>
          <ul className="space-y-4">
            {suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-4 text-textSecondary text-sm leading-relaxed group">
                <span className="w-1.5 h-1.5 bg-accentPrimary rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                <span className="group-hover:text-textPrimary transition-colors">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
