'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

import DottedSeparator from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { useLogin } from '../hooks/use-login'
import { useSocialSignIn } from '../hooks/use-social-sign-in'
import { loginSchema } from '../types/schemas'

const SignInCard = () => {
  const { mutateAsync } = useLogin()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithProvider, isGoogleLoading, isGithubLoading } = useSocialSignIn()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true)
    try {
      await mutateAsync(data)
      toast.success('ログインに成功しました。')
      router.push('/')
      router.refresh()
    } catch (error) {
       // エラーはフック内で既にトースト表示済みのため空    
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">ログイン</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="メールアドレスを入力してください。"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="パスワードを入力してください。"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              size="lg"
              className="w-full "
              type="submit"
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={isGoogleLoading || isGithubLoading}
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => signInWithProvider('google')}
        >
          <FcGoogle className="mr-2 size-5" />
          {isGoogleLoading ? 'ログイン中...' : 'Googleでログイン'}
        </Button>
        <Button
          disabled={isGoogleLoading || isGithubLoading}
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => signInWithProvider('github')}
        >
          <FaGithub className="mr-2 size-5" />
          {isGithubLoading ? 'ログイン中...' : 'Githubでログイン'}
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p className="text-sm text-center">
          アカウントをお持ちでない方は
          <Link href="/sign-up" className="text-blue-700">
            <span className="text-blue-700">こちら</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard
