import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMentorResponse = async (
  prompt: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  try {
    if (!apiKey) {
      return "I'm currently offline (Missing API Key). However, I can still guide you through our platform's features!";
    }

    const model = 'gemini-3-flash-preview';
    
    // Construct a context-aware prompt
    const systemInstruction = `You are "Nexus", the AI Mentor for Futuristic Tech. 
    Your goal is to help college students with SaaS ideas, coding problems, and project planning.
    Keep answers concise, encouraging, and technically accurate.
    Tone: Futuristic, professional, yet accessible to students.
    If asked about the company, explain that Futuristic Tech helps students build real-world SaaS products and learn whiteboarding.`;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const result = await chat.sendMessage({ message: prompt });
    return result.text || "I'm processing that... let's try a different angle.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a glitch in the matrix. Please try asking again.";
  }
};

export const generateProjectIdea = async (topic: string): Promise<string> => {
    try {
        if (!apiKey) return "Please configure your API Key to use the generator.";

        const model = 'gemini-3-flash-preview';
        const prompt = `Generate a unique, industry-ready SaaS project idea based on the topic: "${topic}". 
        Format it as:
        **Title**: [Project Name]
        **Concept**: [1 sentence description]
        **Tech Stack**: [List 3 technologies]
        **Key Feature**: [1 unique selling point]`;

        const result = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        
        return result.text || "Could not generate idea.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "System overload. Try again later.";
    }
}