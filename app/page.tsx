// app/page.tsx
'use client';

// Remove this line: import { Layout } from './components/Layout';
import { EnhancedChat } from './components/EnhancedChat';
import { useState } from 'react';

export default function Home() {
  const [fileUploaded, setFileUploaded] = useState(false);

  return (
    // Remove the <Layout> wrapper. The root layout will provide the structure.
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Assistant for
            <span className="gradient-text block"> Computational Mechanics</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Upload FEA files, debug convergence issues, and accelerate your engineering workflow with AI.
          </p>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
              🚀 ABAQUS .inp
            </span>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
              🔍 Convergence Debug
            </span>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
              📊 Model Health Check
            </span>
            <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">
              🤖 GPT-4 Powered
            </span>
          </div>
        </div>
      </section>

      {/* Main Chat Interface */}
      <EnhancedChat />
    </>
  );
}