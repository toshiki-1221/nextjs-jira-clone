import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { loginSchema } from '../types/schemas'

type RequestType = z.infer<typeof loginSchema>
type ResponseType = {
  email: string
  password: string
}

export const useLogin = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      return await response.json()
    },
  })
  return mutation
}
