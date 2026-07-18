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
  private model: string = 'gpt-4-turbo-preview'; // Use 'gpt-4-turbo-preview' or 'gpt-3.5-turbo'

  async generateResponse(
    messages: ChatMessage[],
    temperature: number = 0.7
  ): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: messages,
        temperature: temperature,
        max_tokens: 2000,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate response from AI');
    }
  }

  async generateEngineeringResponse(
    context: string,
    userMessage: string,
    modelContext?: string
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