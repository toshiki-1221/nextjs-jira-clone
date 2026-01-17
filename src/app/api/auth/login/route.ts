import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/features/auth/types/schemas'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    
    console.log({ email: validatedData.email, password: validatedData.password })
    
    return NextResponse.json({ 
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
