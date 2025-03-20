import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const getGeminiClient = () => {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) {
    throw new Error('Gemini API key not found in environment variables')
  }
  return new GoogleGenerativeAI(apiKey)
}

export async function POST(request: Request) {
  let gemini
  try {
    gemini = getGeminiClient()
  } catch (error) {
    console.error('Gemini client initialization error:', error)
    return NextResponse.json(
      { error: 'Gemini API key not properly configured' },
      { status: 500 }
    )
  }
  try {
    const { messages, events } = await request.json()

    const contextMessage = events.length > 0
      ? `Here are the recent events that have occurred during the video stream:\n${events.map((event: any) => 
          `- At ${event.timestamp}: ${event.description}${event.isDangerous ? ' (⚠️ Dangerous)' : ''}`
        ).join('\n')}\n\nPlease help the user with any questions about these events or provide general assistance.`
      : 'No events have been detected yet. I can still help you with any questions about the video stream or general assistance.'

    console.log('Sending request to Gemini...')
    
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-pro' })
    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{
            text: `You are a helpful assistant monitoring a real-time video stream. You have access to detected events and can provide guidance, especially during dangerous situations. Be concise but informative, and show appropriate concern for dangerous events while remaining calm and helpful.\n\n${contextMessage}`
          }]
        },
        ...messages.map((msg: any) => ({ role: 'user', parts: [{ text: msg.content }] }))
      ]
    })

    const textResponse = response.response.text()
    
    if (!textResponse) {
      throw new Error('Invalid response from Gemini')
    }

    console.log('Successfully received response from Gemini')
    return NextResponse.json({ 
      content: textResponse,
      role: 'assistant'
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { error: `Failed to get chat response: ${errorMessage}` },
      { status: 500 }
    )
  }
}
