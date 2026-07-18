// app/components/EnhancedChat.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { EnhancedDashboard } from './EnhancedDashboard';
import { EngineeringModel } from '@/lib/abaqus/types';

// REMOVED: timestamp from Message interface
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  // timestamp removed to fix hydration error
}

export function EnhancedChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: '👋 Welcome to CAE Copilot! Upload a .inp file or ask any FEA question.',
      // timestamp removed
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<EngineeringModel | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileUpload = async (file: File) => {
    setFile(file);
    const content = await file.text();

    setMessages(prev => [...prev, {
      role: 'system',
      content: `📤 Uploading "${file.name}"...`,
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Uploading file: ${file.name}`,
          fileContent: content,
          fileName: file.name,
        }),
      });

      const data = await response.json();

      if (data.model) {
        setModel(data.model);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: '❌ Failed to upload file. Please try again.',
      }]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
    }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply || 'I apologize, but I encountered an error. Please try again.',
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: '❌ Failed to get response. Please check your connection.',
      }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].name.endsWith('.inp')) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Upload Section */}
      <div
        className={`glass rounded-xl p-6 border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
            : 'border-white/10 hover:border-white/20'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                📁
              </div>
              <div>
                <h3 className="font-semibold">Upload .inp File</h3>
                <p className="text-sm text-gray-400">
                  Drag & drop or click to browse
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary text-sm py-2 px-6"
            >
              Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".inp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
            />
            {file && (
              <span className="text-sm text-green-400 flex items-center gap-2">
                <span className="text-lg">✅</span>
                {file.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard */}
      {model && <EnhancedDashboard model={model} />}

      {/* Chat Section */}
      <div className="glass rounded-xl border border-white/5 mt-4 overflow-hidden">
        {/* Chat Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">CAE Copilot</span>
            <span className="text-xs text-gray-500">• Online</span>
          </div>
          <span className="text-xs text-gray-500">
            {model ? `${model.nodes.toLocaleString()} nodes` : 'Ready'}
          </span>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' :
                msg.role === 'assistant' ? 'justify-start' :
                'justify-center'
              }`}
            >
              {msg.role === 'system' && (
                <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full">
                  {msg.content}
                </div>
              )}
              {msg.role === 'user' && (
                <div className="message-user text-sm">
                  {msg.content}
                </div>
              )}
              {msg.role === 'assistant' && (
                <div className="message-assistant text-sm text-gray-200">
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="message-assistant text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="spinner" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about FEA, convergence, materials..."
              className="input-primary"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="btn-primary text-sm py-2 px-6 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Supports ABAQUS .inp files</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              AI ready
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setInput('What is the analysis type?')}
          className="tag tag-primary hover:bg-blue-500/20 cursor-pointer"
        >
          🔍 Analysis Type
        </button>
        <button
          onClick={() => setInput('Check my model health')}
          className="tag tag-success hover:bg-green-500/20 cursor-pointer"
        >
          ✅ Model Health
        </button>
        <button
          onClick={() => setInput('Why is my model not converging?')}
          className="tag tag-warning hover:bg-yellow-500/20 cursor-pointer"
        >
          ⚠️ Convergence Issues
        </button>
        <button
          onClick={() => setInput('Explain material properties')}
          className="tag hover:bg-white/10 cursor-pointer"
        >
          📖 Material Help
        </button>
      </div>
    </div>
  );
}