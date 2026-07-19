// app/components/EnhancedChat.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { ProfessionalDashboard } from './ProfessionalDashboard';
import { ProfessionalLayout } from './ProfessionalLayout';
import { EngineeringModel } from '@/lib/abaqus/types';
import { 
  Upload, 
  Send, 
  FileUp, 
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Zap
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function EnhancedChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: '👋 Welcome to CAE Copilot! Upload a .inp file or ask any FEA question.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<EngineeringModel | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

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
        body: JSON.stringify({ message: userMessage }),
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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Upload Section - Power BI Style */}
      <div
        className={`glass-card p-8 border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-white/10 hover:border-white/20'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const files = e.dataTransfer.files;
          if (files.length > 0 && files[0].name.endsWith('.inp')) {
            handleFileUpload(files[0]);
          }
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-3xl">
              📁
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload FEA Model</h3>
              <p className="text-sm text-gray-400">
                Drag & drop your .inp file or click to browse
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Upload className="w-4 h-4" />
              Browse Files
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
              <span className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-4 h-4" />
                {file.name}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard */}
      {model && <ProfessionalDashboard model={model} />}

      {/* Chat Section */}
      <div className="glass-card overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-medium">CAE Copilot</span>
            <span className="text-xs text-gray-500">• Online</span>
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">AI Ready</span>
          </div>
          <div className="flex items-center gap-2">
            {model && (
              <span className="text-xs text-gray-400">
                {model.nodes.toLocaleString()} nodes • {model.elements.toLocaleString()} elements
              </span>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-6 space-y-4">
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
                <div className="message-user">
                  {msg.content}
                </div>
              )}
              {msg.role === 'assistant' && (
                <div className="message-assistant">
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="message-assistant">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                  <span className="text-gray-400">Analyzing...</span>
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
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about FEA, convergence, materials..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="btn-primary flex items-center gap-2 text-sm px-6 disabled:opacity-50"
            >
              {loading ? 'Sending...' : (
                <>
                  <Send className="w-4 h-4" />
                  Send
                </>
              )}
            </button>
          </div>
          <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
            <span>Supports ABAQUS .inp files</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-blue-400" />
                AI ready
              </span>
              <span>•</span>
              <span>v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {['🔍 Analysis Type', '✅ Model Health', '⚠️ Convergence Issues', '📖 Material Help'].map((text) => (
          <button
            key={text}
            onClick={() => setInput(text.replace(/^[^\s]+\s/, ''))}
            className="tag hover:bg-white/10 cursor-pointer"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}