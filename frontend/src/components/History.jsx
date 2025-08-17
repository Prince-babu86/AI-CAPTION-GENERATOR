import React, { useRef, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import axios from "../axios/axios.config";

function ChatHistory({ username = "Guest" }) {
  const chatEndRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  // Auto scroll to last message
  

  // Fetch posts on mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get("/posts", { withCredentials: true });
        setHistory(response.data.posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false); // Stop loading after fetch attempt
      }
    };
    getPosts();
  }, []);

  const copyMessage = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  return (
    <div className="h-screen w-screen bg-gray-950 text-white flex flex-col px-5">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800 text-lg font-semibold sticky top-0 bg-gray-900 z-10">
        Chat History ({username})
      </div>

      {/* Messages */}
      <div className="scoller flex-1 overflow-y-auto p-4 space-y-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent border-t-4 border-b-4 border-b-transparent rounded-full animate-spin"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                No Chat History 📭
              </h1>
              <p className="mt-2 text-gray-400">
                Start a conversation and it will appear here!
              </p>
            </div>
          </div>
        ) : (
          history.map((msg, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Image (right side) */}
              {msg.image && (
                <div className="flex justify-end">
                  <div className="relative rounded-2xl max-w-[70%] overflow-hidden">
                    <img
                      src={msg.image}
                      alt="user upload"
                      className="rounded-2xl max-h-64 object-contain border border-gray-700"
                    />
                  </div>
                </div>
              )}

              {/* Caption (left side) */}
              {msg.caption && (
                <div className="flex justify-start">
                  <div className="relative bg-gray-800 rounded-2xl p-3 max-w-[70%] rounded-tl-md">
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                      {msg.caption}
                    </p>
                    <button
                      onClick={() => copyMessage(msg.caption)}
                      className="mt-2 flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                    <span className="absolute -left-2 top-3 w-0 h-0 border-t-[8px] border-b-[8px] border-r-[8px] border-t-transparent border-b-transparent border-r-gray-800"></span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default ChatHistory;
