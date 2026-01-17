import { z } from 'zod'

import { loginSchema, registerSchema } from './schemas'

/**
 * ログインリクエストの型定義
 * @usedIn use-login.ts - メールアドレスとパスワードでのログイン処理
 */
export type LoginRequest = z.infer<typeof loginSchema>

/**
 * アカウント登録リクエストの型定義
 * @usedIn use-register.ts - 新規ユーザー登録処理
 */
export type RegisterRequest = z.infer<typeof registerSchema>

/**
 * ソーシャルログインプロバイダーの型定義
 * @usedIn use-social-sign-in.ts - GitHub/Googleログイン処理
 */
export type SocialProvider = 'github' | 'google'

/**
 * ソーシャルログインフックのオプション
 * @usedIn use-social-sign-in.ts - ソーシャルログインの設定とコールバック
 */
export type UseSocialSignInOptions = {
  callbackURL?: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}
