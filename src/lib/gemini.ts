import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export interface MathProblem {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Oson' | 'O\'rtacha' | 'Murakkab';
}

export async function generateProblem(topic: string): Promise<MathProblem> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Mavzu: ${topic}. 
    Ushbu mavzu bo'yicha murakkab (challenging) darajadagi 1 ta test savoli yarating. 
    Savol o'zbek tilida bo'lishi kerak. 
    Matematik ifodalar uchun LaTeX formatidan foydalaning (masalan, $x^2$).
    Javoblar variantlari 4 ta bo'lsin.
    To'g'ri javobni va tushuntirishni ham qo'shing.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "4 ta variant"
          },
          correctAnswer: { type: Type.STRING },
          explanation: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ['Oson', 'O\'rtacha', 'Murakkab'] }
        },
        required: ["question", "options", "correctAnswer", "explanation", "difficulty"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Savol yaratishda xatolik yuz berdi.");
  }
}
