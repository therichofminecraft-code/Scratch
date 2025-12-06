import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("Gemini API key not found. Smart features will use mock data.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateSmartReplies = async (emailBody: string): Promise<string[]> => {
  if (!apiKey) {
    // Return mock data if API key is not available
    return new Promise(resolve => setTimeout(() => resolve(["Got it, thanks!", "I'll look into this.", "Sounds good."]), 500));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following email, generate 3 short and concise reply suggestions. The replies should be casual and professional.
        ---
        EMAIL:
        ${emailBody}
        ---
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            replies: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
                description: 'A short reply suggestion.'
              },
            },
          },
        },
        temperature: 0.7,
      },
    });
    
    const jsonString = response.text?.trim();
    if (!jsonString) return [];

    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.replies) && parsed.replies.length > 0) {
      return parsed.replies.slice(0, 3);
    }
    
    return [];

  } catch (error) {
    console.error("Error generating smart replies:", error);
    throw new Error("Failed to generate smart replies from Gemini API.");
  }
};

export const summarizeEmail = async (emailBody: string): Promise<string> => {
  if (!apiKey) {
    return new Promise(resolve => setTimeout(() => resolve("This is a mock summary of the email content, discussing project updates and next steps for the analytics dashboard integration."), 1000));
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following email in a short paragraph (2-3 sentences). Focus on the key information and any action items.
        ---
        EMAIL:
        ${emailBody}
        ---
      `,
      config: {
        temperature: 0.3,
      },
    });
    return response.text || "";
  } catch (error) {
    console.error("Error summarizing email:", error);
    throw new Error("Failed to summarize email from Gemini API.");
  }
};

export const generateDraftStream = async (prompt: string) => {
  if (!apiKey) {
    const mockDraft = "This is a mock draft because the API key is unavailable. It demonstrates how text can be streamed into the composer. To get a real AI-generated draft, please provide a valid API key.";
    const chunks = mockDraft.split(' ');
    
    return (async function* () {
      for (const chunk of chunks) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield { text: chunk + ' ' };
      }
    })();
  }

  try {
    return await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: `Based on the following prompt, write a professional and clear email draft.
        ---
        PROMPT:
        ${prompt}
        ---
      `,
      config: {
        temperature: 0.7,
      },
    });
  } catch (error) {
    console.error("Error generating draft:", error);
    throw new Error("Failed to generate draft from Gemini API.");
  }
};

const categories = {
  Important: {
    description: "Urgent messages, personal conversations, or time-sensitive requests.",
    color: "red"
  },
  Promotions: {
    description: "Marketing emails, newsletters, sales, and offers.",
    color: "purple"
  },
  Social: {
    description: "Notifications from social media networks.",
    color: "green"
  },
  Updates: {
    description: "Automated updates, confirmations, receipts, and notifications.",
    color: "blue"
  },
  Work: {
    description: "Work-related correspondence, project discussions, and team communication.",
    color: "yellow"
  }
};

export const categorizeEmail = async (subject: string, body: string): Promise<{ category: string; color: string; } | null> => {
    if (!apiKey) {
      const mockCategories = [
        { category: 'Updates', color: 'blue' },
        { category: 'Work', color: 'yellow' },
        { category: 'Important', color: 'red' },
        { category: 'Promotions', color: 'purple' },
      ];
      return new Promise(resolve => setTimeout(() => resolve(mockCategories[Math.floor(Math.random() * mockCategories.length)]), 200));
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following email and categorize it.
            
            Subject: ${subject}
            Body: ${body.substring(0, 500)}...

            Available categories are: ${JSON.stringify(categories, null, 2)}
            
            Respond with only the JSON object for the most appropriate category, containing the category name and its color.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        category: { type: Type.STRING },
                        color: { type: Type.STRING }
                    },
                    required: ['category', 'color']
                },
                temperature: 0,
            },
        });

        const jsonString = response.text?.trim();
        if (!jsonString) return null;

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error categorizing email:", error);
        return null;
    }
}