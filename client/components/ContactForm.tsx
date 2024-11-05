"use client"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { createContact } from "@/lib/actions/contact.actions"
import { useForm } from "react-hook-form"
import { Input } from "./Input"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

interface CreateContactProps {
  phone_number: string
  phone_model: string
  brand: string
  imei: string
  latitude: number
  longitude: number
}

export function ContactForm() {

  const form = useForm({
    defaultValues: {
      phone_number: '',
      phone_model: '',
      brand: '',
      imei: '',
      latitude: 0,
      longitude: 0
    }
  })

  async function onSubmit(values: CreateContactProps) {
    const token = cookies().get('session')?.value

    try {
      const newContactResponse = await fetch('https://apiphonestream-production.up.railway.app/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          phone_model: values.phone_model,
          phone_number: values.phone_number,
          point: { type: "Point", coordinates: [parseFloat(values.latitude.toString()), parseFloat(values.longitude.toString())] },
          brand: values.brand,
          imei: values.imei,
          status: "active",
          isStolen: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      })

      console.log(newContactResponse)

      // if (newContact) {
      //   form.reset()
      // }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col px-10 py-10 gap-4 w-full h-full items-center justify-center bg-zinc-700 rounded-md">
        <h1 className="text-2xl text-zinc-100">Novo contato</h1>
        <FormField
          control={form.control}
          name="phone_model"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-zinc-100">Nome do contato</label>
              <FormControl>
                <Input type="text" placeholder="Nome do contato" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-zinc-100">Número do contato</label>
              <FormControl>
                <Input type="text" placeholder="Número do contato" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-zinc-100">Número do contato</label>
              <FormControl>
                <Input type="text" placeholder="Número do contato" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imei"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-zinc-100">Número do contato</label>
              <FormControl>
                <Input type="text" placeholder="Número do contato" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-zinc-100">Latidude</label>
              <FormControl>
                <Input type="number" placeholder="Latitude" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <label className="text-zinc-100">Longitude</label>
              <FormControl>
                <Input type="number" placeholder="Longitude" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <button type="submit" className="w-72 h-10 self-center bg-white rounded-md hover:bg-green-400 hover:text-zinc-100">Adicionar</button>
      </form>
    </Form>
  )
}