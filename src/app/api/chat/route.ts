import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getResumeAsText } from "@/lib/resume-data";

/* eslint-disable @typescript-eslint/no-explicit-any */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const resumeText = getResumeAsText();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or 'gpt-4o-mini' if you prefer
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant answering questions about Karam Abou Hawili's resume. 

Here is the complete resume:

${resumeText}

Instructions:
- Only answer questions based on the resume information provided above
- Be concise and helpful
- If asked about something not in the resume, politely say you don't have that information
- You can be conversational but stay professional`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to get response" },
      { status: 500 },
    );
  }
}
