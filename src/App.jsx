import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import JobInput from './components/JobInput';
import AnalysisResult from './components/AnalysisResult';
import { extractTextFromPDF } from './services/pdfParser';
import { analyzeResume } from './services/gemini';
import { Sparkles, Loader2 } from 'lucide-react';

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file || !jobDescription) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      // 1. Extract text from PDF
      const resumeText = await extractTextFromPDF(file);
      
      // 2. Analyze with Gemini
      const analysis = await analyzeResume(resumeText, jobDescription);
      
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary p-6 md:p-12 relative overflow-hidden font-body selection:bg-accentMuted">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accentMuted/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accentTertiary/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-accentPrimary/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accentMuted border border-borderDefault mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-accentPrimary" />
            <span className="text-xs font-bold font-ui text-textSecondary tracking-wider uppercase">AI-Powered Career Optimization</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-b from-textPrimary via-textSecondary to-textTertiary mb-6 tracking-tight">
            Resume Matcher
          </h1>
          <p className="text-lg md:text-xl text-textSecondary max-w-2xl mx-auto leading-relaxed font-light">
            Upload your resume and paste a job description to get an instant match score and personalized improvement suggestions.
          </p>
        </header>

        <main className="space-y-12 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-surface p-1 rounded-3xl border border-borderDefault shadow-lg">
              <div className="bg-backgroundAlt rounded-[20px] p-6 h-full">
                <FileUpload 
                  file={file} 
                  onFileUpload={setFile} 
                  onClear={() => { setFile(null); setResult(null); }} 
                />
              </div>
            </div>
            
            <div className="bg-surface p-1 rounded-3xl border border-borderDefault shadow-lg">
              <div className="bg-backgroundAlt rounded-[20px] p-6 h-full">
                <JobInput 
                  value={jobDescription} 
                  onChange={setJobDescription} 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={handleAnalyze}
              disabled={!file || !jobDescription || isAnalyzing}
              className={`
                group relative px-12 py-6 rounded-2xl font-bold font-ui text-lg transition-all duration-300 overflow-hidden
                ${!file || !jobDescription 
                  ? 'bg-btnSecondary text-textTertiary cursor-not-allowed border border-borderDefault' 
                  : 'bg-btnPrimary text-textInverse hover:bg-btnPrimaryHover hover:scale-105 shadow-lg shadow-accentPrimary/30'
                }
              `}
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-3 relative z-10">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Profile...</span>
                </div>
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  Analyze Match <Sparkles className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>

          {error && (
            <div className="text-center text-error bg-error/10 p-4 rounded-xl border border-error/20 max-w-2xl mx-auto font-medium">
              {error}
            </div>
          )}

          <AnalysisResult result={result} />
        </main>
      </div>
    </div>
  );
}

export default App;
