import React, { useState, useRef, useEffect } from 'react';
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
  const resultsRef = useRef(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

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
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface rounded-[2.5rem] p-8 md:p-12 border border-borderDefault shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentPrimary opacity-20" />
              
              <div className="space-y-12">
                {/* Step 1: Resume Upload */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accentMuted flex items-center justify-center text-accentPrimary font-bold font-heading text-lg shadow-sm">1</div>
                    <h2 className="text-2xl font-bold font-heading text-textPrimary">Upload Resume</h2>
                  </div>
                  <div className="pl-14">
                    <FileUpload 
                      file={file} 
                      onFileUpload={setFile} 
                      onClear={() => { setFile(null); setResult(null); }} 
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="relative pl-14">
                  <div className="absolute left-5 -top-12 bottom-0 w-px bg-borderDefault" />
                  <div className="h-px w-full bg-borderDefault" />
                </div>

                {/* Step 2: Job Description */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accentMuted flex items-center justify-center text-accentPrimary font-bold font-heading text-lg shadow-sm">2</div>
                    <h2 className="text-2xl font-bold font-heading text-textPrimary">Job Description</h2>
                  </div>
                  <div className="pl-14">
                    <JobInput 
                      value={jobDescription} 
                      onChange={setJobDescription} 
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="pl-14 pt-4">
                  <button
                    onClick={handleAnalyze}
                    disabled={!file || !jobDescription || isAnalyzing}
                    className={`
                      w-full group relative px-8 py-5 rounded-xl font-bold font-ui text-lg transition-all duration-300 overflow-hidden flex items-center justify-center gap-3
                      ${!file || !jobDescription 
                        ? 'bg-backgroundAlt text-textTertiary cursor-not-allowed border border-borderDefault' 
                        : 'bg-btnPrimary text-textInverse hover:bg-btnPrimaryHover shadow-lg shadow-accentPrimary/25 hover:shadow-xl hover:shadow-accentPrimary/30 hover:-translate-y-0.5'
                      }
                    `}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Analyzing Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>Analyze Match</span>
                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-center text-error bg-error/10 p-4 rounded-xl border border-error/20 max-w-2xl mx-auto font-medium">
              {error}
            </div>
          )}

          <div ref={resultsRef}>
            <AnalysisResult result={result} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
