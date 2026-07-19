// lib/ai/openai.ts

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class OpenAIService {
  // ✅ FIXED: Use a valid model name
  private model: string = 'gpt-3.5-turbo';  // Works with your $4.87 credit

  async generateResponse(
    messages: ChatMessage[],
    temperature: number = 0.7
  ): Promise<string> {
    try {
      // Check if API key exists
      if (!process.env.OPENAI_API_KEY) {
        console.error('🚨 OPENAI_API_KEY is not set');
        throw new Error('OpenAI API key is missing. Please set OPENAI_API_KEY in your .env.local file.');
      }

      console.log(`📤 Sending request to OpenAI (${this.model})...`);
      
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: messages,
        temperature: temperature,
        max_tokens: 2000,
      });

      const reply = response.choices[0]?.message?.content || '';
      console.log(`✅ OpenAI response received (${reply.length} characters)`);
      return reply;

    } catch (error) {
      console.error('❌ OpenAI API Error:', error);
      
      // Provide helpful error messages
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Invalid or missing OpenAI API key. Please check your .env.local file.');
        }
        if (error.message.includes('rate limit')) {
          throw new Error('OpenAI rate limit exceeded. Please wait and try again.');
        }
        if (error.message.includes('insufficient_quota')) {
          throw new Error('OpenAI API quota exceeded. Please check your billing details.');
        }
        if (error.message.includes('model_not_found')) {
          throw new Error(`Model '${this.model}' not found. Please check the model name.`);
        }
      }
      
      throw new Error('Failed to generate response from AI. Please try again.');
    }
  }

  async generateEngineeringResponse(
    context: string,
    userMessage: string
  ): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: context,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];

    return this.generateResponse(messages);
  }
}

export const openaiService = new OpenAIService();