import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = ""; // In production, use env var
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeResume = async (resumeText, jobDescription) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    You are an expert ATS (Applicant Tracking System) and career coach.
    Analyze the following resume against the job description.
    
    Resume Text:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Provide the output in the following JSON format ONLY (no markdown code blocks):
    {
      "score": <number between 0 and 100>,
      "matchedSkills": [<array of strings>],
      "missingSkills": [<array of strings>],
      "suggestions": [<array of strings, actionable advice>]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean up markdown if present
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
