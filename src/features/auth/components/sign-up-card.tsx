import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { z } from 'zod'

import DottedSeparator from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useRegister } from '../hooks/use-register'
import { registerSchema } from '../types/schemas'

const SignUpcard = () => {
  const { mutate } = useRegister()
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })
  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    mutate(data)
  }
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex flex-col items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">アカウント登録</CardTitle>
        <CardDescription className="text-sm">
          サインアップすることで、当社の <br />{' '}
          <Link href="/privacy-policy">
            <span className="text-blue-700">プライバシーポリシー</span>
          </Link>{' '}
          と{' '}
          <Link href="/terms-of-service">
            <span className="text-blue-700">利用規約</span>
          </Link>{' '}
          に同意したことになります。
          <br />
          ご不明な点は、お問い合わせフォームよりお問い合わせください。
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="お名前を入力してください。"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              disabled={false}
              size="lg"
              className="w-full "
              type="submit"
            >
              アカウント登録
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="mr-2 size-5" />
          Googleでログイン
        </Button>
        <Button
          disabled={false}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Githubでログイン
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p className="text-sm text-center">
          アカウントをお持ちの方は
          <Link href="/sign-in" className="text-blue-700">
            <span className="text-blue-700">こちら</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignUpcard
