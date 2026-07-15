"use client";

import ChatWindow from "./ChatWindow";
import { useState } from "react";

export default function PromptBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      setReply(data.reply || data.error);
    } catch (error) {
      setReply("Unable to connect to AI.");
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-12">

      <div className="flex">

        <input
          className="flex-1 p-5 rounded-l-xl bg-slate-800 text-white text-xl outline-none"
          placeholder="Ask anything about Abaqus, FEA, UMAT, MATLAB..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 rounded-r-xl"
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>

      
      <ChatWindow reply={reply} /> </div>
  );
}