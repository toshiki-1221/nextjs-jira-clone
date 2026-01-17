import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { registerSchema } from '@/features/auth/types/schemas'
import { prisma } from '@/lib/prisma'
import { hashPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)
    
    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'このメールアドレスは既に登録されています。' },
        { status: 409 }
      )
    }
    
    // パスワードをハッシュ化
    const hashedPassword = await hashPassword(validatedData.password)
    
    // ユーザーを作成
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      },
    })
    
    // JWTトークンを生成
    const token = generateToken(user.id, user.email)
    
    // レスポンスを作成（パスワードは含めない）
    const response = NextResponse.json(
      {
        message: 'アカウントが正常に作成されました。',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    )
    
    // トークンをCookieに設定
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7日間
    })
    
    return response
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: '入力データが無効です。', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'アカウント登録に失敗しました。' },
      { status: 500 }
    )
  }
}
