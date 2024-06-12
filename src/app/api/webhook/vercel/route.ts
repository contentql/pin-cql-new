// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const event = await req.json()
//     console.log(event)

//     if (event.type === 'deployment.created') {
//       someFunctionOne('deployment.created', event.payload)
//     } else if (event.type === 'deployment.succeeded') {
//       someFunctionTwo('deployment.succeeded', event.payload)
//     }

//     return NextResponse.json({ status: 'success' })
//   } catch (error) {
//     console.error('Error processing webhook:', error)
//     return NextResponse.json(
//       { status: 'error', message: 'Invalid JSON' },
//       { status: 400 },
//     )
//   }
// }
