
import { GoogleGenAI, Type } from "@google/genai";
import { AIMode, QuizQuestion, ChatMessage } from "../types";

// Always initialize with the process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonContent = async (level: string, topic: string, mode: AIMode) => {
  const model = (mode === AIMode.DEEP_EXPLAIN || mode === AIMode.TROUBLESHOOT || mode === AIMode.TEMPLATE) 
    ? "gemini-3-pro-preview" 
    : "gemini-3-flash-preview";
  
  let systemInstruction = "You are a senior computer teacher in Myanmar. You help beginners learn technology in simple Myanmar language (Unicode). \n\nIMPORTANT FORMATTING RULES:\n1. Use Markdown for formatting.\n2. Use '### Header Title' for main sections.\n3. Use bold text (**word**) for key terms.\n4. Use bullet points (-) for lists.\n5. Use numbered lists (1.) for steps.\n6. For complex data, templates, or comparison lists, use Markdown Tables (| header | header |).\n7. Ensure the content is structured into at least 3-4 sections using the '###' syntax so the app can display them as collapsible parts.";
  let prompt = "";

  switch (mode) {
    case AIMode.EXPLAIN:
      prompt = `Explain the topic "${topic}" from the ${level} curriculum in simple Myanmar language for a total beginner. Divide the explanation into 3-4 clear sections starting with '###'.`;
      break;
    case AIMode.DEEP_EXPLAIN:
      prompt = `Provide a comprehensive and detailed deep-dive into the topic "${topic}" within the ${level} curriculum. Include technical background and internal workings. Divide into detailed sections with '###'.`;
      break;
    case AIMode.STEP_BY_STEP:
      prompt = `Provide a clear step-by-step tutorial in Myanmar language on how to perform or understand "${topic}". Use '###' for major phases.`;
      break;
    case AIMode.TROUBLESHOOT:
      prompt = `Explain common errors related to "${topic}" and provide solutions in Myanmar language. Use '###' for each case. Use a Markdown Table to compare "Problem" and "Solution" if applicable.`;
      break;
    case AIMode.TEMPLATE:
      prompt = `Generate a useful template or sample for the topic "${topic}" in ${level}. Use '###' for divisions. Use Markdown Code Blocks for templates and Tables for structured data examples.`;
      break;
    case AIMode.PRACTICE_DATA:
      prompt = `Generate dummy practice data for exercises related to "${topic}". Use '###' for different exercises. Present practice datasets using Markdown Tables for better readability.`;
      break;
    default:
      prompt = `Discuss the topic "${topic}" for ${level} in Myanmar using structured Markdown formatting with '###' sections.`;
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: { systemInstruction }
  });

  return response.text;
};

export const askAiTutor = async (
  level: string, 
  topic: string, 
  lessonContext: string, 
  userMessage: string, 
  history: ChatMessage[]
) => {
  const model = "gemini-3-pro-preview";
  const systemInstruction = `You are a helpful Myanmar AI Tutor. The user is currently studying "${topic}" in the "${level}" module. 
  Answer their questions in Myanmar language, being patient, encouraging, and clear. Use simple Markdown (bold, lists, tables) for clarity.`;

  const historyPrompt = history.map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.text}`).join('\n');
  const fullPrompt = `${historyPrompt}\nStudent: ${userMessage}\nTutor:`;

  const response = await ai.models.generateContent({
    model,
    contents: fullPrompt,
    config: { systemInstruction }
  });

  return response.text;
};

export const generateQuiz = async (level: string, topic: string): Promise<QuizQuestion[]> => {
  const model = "gemini-3-pro-preview";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Generate 5 multiple-choice questions for the topic "${topic}" in the ${level} computer course. 
    The questions and options should be in Myanmar language. 
    Return the result as a JSON array.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            correctAnswer: { 
              type: Type.INTEGER, 
              description: "Index of the correct answer (0-3)" 
            },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"],
          propertyOrdering: ["question", "options", "correctAnswer", "explanation"],
        }
      }
    }
  });

  try {
    const text = response.text || '[]';
    return JSON.parse(text.trim());
  } catch (e) {
    console.error("Failed to parse quiz JSON", e);
    return [];
  }
};

// Add export for generateTypingText to fix component error
export const generateTypingText = async (language: 'en' | 'my'): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  const prompt = language === 'en'
    ? "Generate a short, engaging paragraph of text for typing practice in English. Focus on common vocabulary and natural flow. Length should be between 200 and 300 characters."
    : "Generate a short paragraph of Myanmar Unicode text for typing practice. Ensure it uses standard Unicode. Length should be between 100 and 200 characters.";

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: "You are a typing tutor. Provide only the requested practice text. Do not include any commentary, titles, or other information."
    }
  });

  return response.text?.trim() || "";
};
