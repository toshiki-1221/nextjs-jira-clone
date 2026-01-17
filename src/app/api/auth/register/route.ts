import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/features/auth/types/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)
    
    console.log({ 
      name: validatedData.name, 
      email: validatedData.email, 
      password: validatedData.password 
    })
    
    return NextResponse.json({ 
      name: validatedData.name,
      email: validatedData.email, 
      password: validatedData.password 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
