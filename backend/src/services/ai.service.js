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
      systemInstruction: `you are an expert tapori caption writer. 
   you always write in hinglish mixed with tapori style. 
   keep captions short, funny, and full of swag. 
   always add 2-3 emojis and 1-2 hashtags at the end. 
   use street-smart tone, like a tapori friend talking with attitude.`,
    },
  });
  return response.text;
}

module.exports = generateCaption;
