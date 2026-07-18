"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";
import UploadBox from "./UploadBox";
import AbaqusSummary from "./AbaqusSummary";
import { parseAbaqusInput } from "../../lib/abaqusParser";
import { AbaqusSummary as Summary } from "../../lib/types";

export default function PromptBox() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

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
      console.error(error);
      setReply("Unable to connect to AI.");
    }

    setLoading(false);
  }

  async function handleReadFile() {
    if (!selectedFile) return;

    const text = await selectedFile.text();

    const result = parseAbaqusInput(text);

    setSummary(result);
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-12">

      <UploadBox onFileSelect={setSelectedFile} />

      {selectedFile && (
        <div className="mt-4">

          <p className="text-green-600 font-medium">
            📂 Selected File: {selectedFile.name}
          </p>

          <button
            onClick={handleReadFile}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Read Abaqus File
          </button>

        </div>
      )}

      {summary && <AbaqusSummary summary={summary} />}

      <div className="flex mt-6">

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

      <ChatWindow reply={reply} />

    </div>
  );
}