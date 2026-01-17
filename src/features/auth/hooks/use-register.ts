import { signUp } from '@/lib/auth-client'
import { toast } from 'sonner'

import { type RegisterRequest } from '../types/types'

export const useRegister = () => {
  const handleSignUp = async (data: RegisterRequest) => {
    try {
      const result = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      })

      if (result.error) {
        let errorMessage = 'アカウント登録に失敗しました。'
        // メールアドレスが既に存在する場合のエラーメッセージ
        if (result.error.code === 'USER_ALREADY_EXISTS') {
          errorMessage = 'このメールアドレスは既に登録されています。'
        } 

        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      return result
    } catch (error) {
      // ネットワークエラーや予期しないエラーの場合
      if (error instanceof Error) {
        // 既にtoast.errorが呼ばれている場合はスキップ
        if (!error.message.includes('アカウント登録')) {
          toast.error(error.message || 'アカウント登録に失敗しました。')
        }
      } else {
        toast.error('アカウント登録に失敗しました。')
      }
      throw error
    }
  }

  return {
    mutateAsync: handleSignUp,
  }
}
