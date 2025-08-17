import React, { useState, useRef, useEffect } from "react";
import { Copy, Send, Paperclip, Volume2 } from "lucide-react";
import axios from "../axios/axios.config";
import { useNavigate } from "react-router-dom";

function CaptionWithImage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState(null);
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [username, setUsername] = useState("Guest");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSend = async () => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setMessages((prev) => [...prev, { type: "user", image: imageUrl }]);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const hinglishCaption =
        response.data?.post?.caption ||
        "Arey wah! Yeh pic to full on mast lag rahi hai 🔥😂";

      setMessages((prev) => [...prev, { type: "ai", text: hinglishCaption }]);
      setFile(null);
    } catch (error) {
      navigate("/login");
      console.error("Upload error:", error);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Arre yaar, kuch error aa gaya 😅" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("/auth/user", { withCredentials: true });
        setUsername(response.data.user.username || "Guest");
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };
    fetchUsername();
  }, []);

  const copyCaption = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const speakCaption = (text) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";

    const voices = speechSynthesis.getVoices();
    const femaleVoice =
      voices.find((v) => v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.name.toLowerCase().includes("google हिन्दी")) ||
      voices.find((v) => v.name.toLowerCase().includes("google us english"));

    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.pitch = 1.2;
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex flex-col overflow-x-hidden">
      <div className="flex flex-col flex-1 bg-gray-900 border border-gray-800">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-800 text-lg font-semibold sticky top-0 bg-gray-900 z-10">
          Chat with AI
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-center items-center">
          {messages.length === 0 ? (
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Welcome, {username}! 👋
              </h1>
              <p className="mt-2 text-gray-400 text-lg">
                Upload an image and get a cool AI-generated caption 🚀
              </p>
            </div>
          ) : (
            <div className="w-full space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    msg.type === "user" ? "flex-row-reverse text-right" : ""
                  }`}
                >
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-sm">
                    {msg.type === "user" ? "You" : "AI"}
                  </div>
                  <div
                    className={`relative bg-gray-800 rounded-2xl p-3 max-w-[90%] sm:max-w-[75%] w-fit break-words ${
                      msg.type === "user" ? "rounded-tr-md" : "rounded-tl-md"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Uploaded preview"
                        className="rounded-xl max-h-80 w-full object-contain"
                      />
                    )}
                    {msg.text && (
                      <>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {msg.text}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => copyCaption(msg.text)}
                            className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600"
                          >
                            <Copy className="w-3 h-3" />
                            {copied ? "Copied!" : "Copy"}
                          </button>
                          <button
                            onClick={() => speakCaption(msg.text)}
                            className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600"
                          >
                            <Volume2 className="w-3 h-3" /> Speak
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-sm">
                    AI
                  </div>
                  <div className="relative bg-gray-800 rounded-2xl rounded-tl-md p-4 max-w-[90%] sm:max-w-[75%]">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-800 flex items-center gap-2 sticky bottom-0 bg-gray-900">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Image preview */}
          {file && (
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-700">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={!file}
            className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaptionWithImage;
