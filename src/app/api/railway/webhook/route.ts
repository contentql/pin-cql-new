import { NextRequest } from 'next/server'

import { deployTemplate } from '~/src/app/(app)/(dashboard)/handlers/deployTemplate'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    console.log(data)

    if (data.status === 'SUCCESS' && data.service.name === 'MongoDB') {
      await deployTemplate()
    } else {
      console.log('Template creation failed')
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error ', error)
  }
}
