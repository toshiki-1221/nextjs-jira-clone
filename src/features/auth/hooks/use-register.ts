import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { registerSchema } from '../types/schemas'

type RequestType = z.infer<typeof registerSchema>
type ResponseType = {
  name: string
  email: string
  password: string
}

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      return await response.json()
    },
  })
  return mutation
}
