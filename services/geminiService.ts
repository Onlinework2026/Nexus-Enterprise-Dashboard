
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a compelling, professional, and concise one-sentence marketing description for a product named "${productName}" in the "${category}" category.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      }
    });
    return response.text?.trim() || "Quality product for everyday use.";
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "Failed to generate description. Please enter manually.";
  }
};
