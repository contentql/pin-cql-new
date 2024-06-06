import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log(JSON.stringify(data, null, 2)) // Pretty-print the JSON data
    return new Response(JSON.stringify(data, null, 2), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error parsing request body:', error)
    return new Response('Invalid JSON', { status: 400 })
  }
}
