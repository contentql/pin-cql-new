import { NextRequest } from 'next/server'

import { addClient, removeClient } from '@/lib/clients'

export async function GET(req: NextRequest, context: any) {
  const id = context.params.id.toString()
  console.log(id)
  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()

  const encoder = new TextEncoder()

  writer.write(encoder.encode('data: \n\n'))

  const clientId = id //
  addClient(clientId, {
    write: (message: string) => writer.write(encoder.encode(message)),
    end: () => writer.close(),
  })

  req.signal.addEventListener('abort', () => {
    removeClient(clientId)
    writer.close()
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
