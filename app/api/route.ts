import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import getGeminiParams from '@/app/api/getGeminiParams'

export interface SurveyField {
  fieldType: number
  fieldLabel: string
  fieldDescription?: string
  requiredField: boolean
  maximumLength?: number
  range?: [number, number]
  options?: string[]
  allowMultipleSelection?: boolean
}

export interface RequestBody {
  prompt: string
}

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  }
  const requestBody: RequestBody = await request.json()

  if (!requestBody.prompt) {
    return NextResponse.json(
      { error: `The key 'prompt' is required in request body` },
      { status: 400 }
    )
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  })
  const response = await ai.models.generateContent(getGeminiParams(requestBody.prompt))

  const result = response.text
  if (!result) {
    return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
  }
  return NextResponse.json(JSON.parse(result) as SurveyField[])
}
