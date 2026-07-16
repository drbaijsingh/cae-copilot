import { systemPrompt } from "../../../prompts/systemPrompt";
import { NextResponse } from "next/server";
import { openai } from "../../../lib/openai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }
    console.log("OPENAI_API_KEY =", process.env.OPENAI_API_KEY);
    const response = await openai.responses.create({
    model: "gpt-5.5",
    instructions: systemPrompt,
    input: message,
    });

    return NextResponse.json({
      reply: response.output_text,
    });

  } catch (error: any) {
    console.error("========== OPENAI ERROR ==========");
    console.error(error);
    console.error("=================================");

    return NextResponse.json(
      {
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}