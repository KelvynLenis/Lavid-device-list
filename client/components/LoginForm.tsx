'use client'

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "./Input"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { setCookie } from "cookies-next"

export function LoginForm() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: { email: string, password: string }) {
    try {
      const result = await fetch('https://apiphonestream-production.up.railway.app/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: values.email,
          password: values.password,
        })
      })

      if (!result.ok) {
        const error = await result.json()
        console.error(error)
        return
      }

      const data = await result.json()

      const cookieResult = await fetch('/api/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: data.token })
      });

      console.log('Resultado do cookie:', cookieResult);

      if (cookieResult.ok) {
        router.push('/home')
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white items-center p-5 rounded-md">
        <h1 className="text-2xl text-zinc-700">Faça login</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-zinc-700">Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Email" {...field} className="bg-zinc-100" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-zinc-700">Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} className="bg-zinc-100" />
              </FormControl>
            </FormItem>
          )}
        />

        <button type="submit" className="w-72 h-10 self-center text-zinc-100 bg-green-400 rounded-md hover:opacity-60">Entrar</button>

        <span>
          Não tem uma conta? <Link href="/register" className="text-blue-400 hover:opacity-50">Cadastre-se</Link>
        </span>
      </form>
    </Form>
  )
}