import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

import {
  type SocialProvider,
  type UseSocialSignInOptions,
} from '../types/types'

export const useSocialSignIn = (options: UseSocialSignInOptions = {}) => {
  const { callbackURL = '/', onSuccess, onError } = options
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<SocialProvider | null>(null)

  const signInWithProvider = useCallback(
    async (provider: SocialProvider) => {
      setIsLoading(provider)

      try {
        const result = await authClient.signIn.social({
          provider,
          callbackURL,
        })

        if (result.error) {
          const providerName = provider === 'github' ? 'GitHub' : 'Google'
          let errorMessage = `${providerName}ログインに失敗しました。`

          if (result.error.message) {
            const message = result.error.message.toLowerCase()
            if (message.includes('cancelled') || message.includes('denied')) {
              errorMessage = `${providerName}ログインがキャンセルされました。`
            } else if (message.includes('network') || message.includes('fetch')) {
              errorMessage = 'ネットワークエラーが発生しました。再度お試しください。'
            } else {
              errorMessage = result.error.message
            }
          }

          const error = new Error(errorMessage)
          toast.error(errorMessage)

          if (onError) {
            onError(error)
          }

          throw error
        }

        // 成功時の処理
        if (onSuccess) {
          onSuccess()
        } else {
          router.push(callbackURL)
          router.refresh()
        }

        return result
      } catch (error) {
        // ネットワークエラーや予期しないエラーの場合
        if (error instanceof Error) {
          // 既にtoast.errorが呼ばれている場合はスキップ
          if (!error.message.includes('ログイン') && !error.message.includes('キャンセル')) {
            const providerName = provider === 'github' ? 'GitHub' : 'Google'
            toast.error(`${providerName}ログインに失敗しました。`)
          }

          if (onError) {
            onError(error)
          }
        } else {
          const providerName = provider === 'github' ? 'GitHub' : 'Google'
          toast.error(`${providerName}ログインに失敗しました。`)
        }

        throw error
      } finally {
        setIsLoading(null)
      }
    },
    [callbackURL, router, onSuccess, onError]
  )

  return {
    signInWithProvider,
    isLoading,
    isGoogleLoading: isLoading === 'google',
    isGithubLoading: isLoading === 'github',
  }
}
