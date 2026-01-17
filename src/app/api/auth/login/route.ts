import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { loginSchema } from '@/features/auth/types/schemas'
import { prisma } from '@/lib/prisma'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = loginSchema.parse(body)
    
    // ユーザーを検索
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが正しくありません。' },
        { status: 401 }
      )
    }
    
    // パスワードを検証
    const isPasswordValid = await verifyPassword(
      validatedData.password,
      user.password
    )
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'メールアドレスまたはパスワードが正しくありません。' },
        { status: 401 }
      )
    }
    
    // JWTトークンを生成
    const token = generateToken(user.id, user.email)
    
    // レスポンスを作成（パスワードは含めない）
    const response = NextResponse.json(
      {
        message: 'ログインに成功しました。',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
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
    
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'ログインに失敗しました。' },
      { status: 500 }
    )
  }
}
