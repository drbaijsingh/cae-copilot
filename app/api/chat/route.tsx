// app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { openaiService } from '@/lib/ai/openai';
import { contextBuilder } from '@/lib/ai/contextBuilder';
import { abaqusParser } from '../../../lib/abaqus/parser';
import { EngineeringModel } from '@/lib/abaqus/types';

// In-memory store for the current model (will be replaced with a database)
let currentModel: EngineeringModel | null = null;

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON request body
    const { message, fileContent, fileName } = await req.json();

    // --- FILE UPLOAD HANDLING ---
    if (fileContent && fileName) {
      // Parse the uploaded .inp file
      const result = abaqusParser.parse(fileContent, fileName);

      if (result.success && result.model) {
        // Store the parsed model in memory for subsequent chat queries
        currentModel = result.model;

        // Return a summary to the user
        return NextResponse.json({
          reply: `✅ File "${fileName}" uploaded and analyzed successfully!\n\n` +
                 `📊 Model Summary:\n` +
                 `- Analysis Type: ${result.model.analysisType}\n` +
                 `- Elements: ${result.model.elements.toLocaleString()}\n` +
                 `- Nodes: ${result.model.nodes.toLocaleString()}\n` +
                 `- Materials: ${result.model.materials.length}\n` +
                 `- Steps: ${result.model.steps.length}\n` +
                 `- Health Score: ${result.model.healthScore}%\n\n` +
                 `You can now ask questions about this model.`,
        });
      } else {
        // Handle parsing failure
        return NextResponse.json({
          reply: `❌ Failed to parse file: ${result.error || 'Unknown error'}`,
        });
      }
    }

    // --- CHAT HANDLING ---
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required.' },
        { status: 400 }
      );
    }

    // Build context for the AI using the current model (if any)
    const context = contextBuilder.build(currentModel, message);

    // Get the AI response
    const reply = await openaiService.generateEngineeringResponse(
      context,
      message
    );

    return NextResponse.json({ reply });

  } catch (error) {
    // Log the error for debugging
    console.error('API Error:', error);

    // Return a generic error response
    return NextResponse.json(
      {
        error: 'Failed to process request.',
      },
      { status: 500 }
    );
  }
}