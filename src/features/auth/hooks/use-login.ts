import { signIn } from '@/lib/auth-client'
import { toast } from 'sonner'

import { type LoginRequest } from '../types/types'

export const useLogin = () => {
  const handleSignIn = async (data: LoginRequest) => {
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        let errorMessage = 'ログインに失敗しました。'

        if (result.error.message) {
          const message = result.error.message.toLowerCase()
          if (
            message.includes('invalid') ||
            message.includes('incorrect') ||
            message.includes('wrong') ||
            message.includes('password')
          ) {
            errorMessage = 'メールアドレスまたはパスワードが正しくありません。'
          } else if (message.includes('not found') || message.includes('does not exist')) {
            errorMessage = 'このメールアドレスは登録されていません。'
          } else if (message.includes('verified') || message.includes('verification')) {
            errorMessage = 'メールアドレスの確認が必要です。'
          } else {
            errorMessage = result.error.message
          }
        }

        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      return result
    } catch (error) {
      // ネットワークエラーや予期しないエラーの場合
      if (error instanceof Error) {
        // 既にtoast.errorが呼ばれている場合はスキップ
        if (!error.message.includes('ログイン')) {
          toast.error(error.message || 'ログインに失敗しました。')
        }
      } else {
        toast.error('ログインに失敗しました。')
      }
      throw error
    }
  }

  return {
    mutateAsync: handleSignIn,
  }
}
