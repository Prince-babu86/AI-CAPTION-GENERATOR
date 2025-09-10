const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  // apiKey: "AIzaSyDnirg5nvOl0LplfHbbxPwrtmjbMhbM11A",
});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `You are an expert caption writer. For cute pics → write short shayari-style captions in Hindi, sweet and emotional. For funny pics → write extra funny, witty captions in Hindi, full of masti. Always keep captions short and creative. Always add 2-3 emojis and 1-2 hashtags at the end..
   `,
    },
  });
  return response.text;
}

module.exports = generateCaption;
