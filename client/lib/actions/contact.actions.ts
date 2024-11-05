'use server'

import { ObjectId } from 'mongoose';
import { connectToDatabase } from '../database';
import Contact from '../database/models/contact.model';
import { revalidatePath } from 'next/cache'

interface ContactProps {
  contactName: string
  phoneNumber: string
  location: { type: string, coordinates: number[] }
  views?: number
}

export async function createContact(contact: ContactProps) {
  const { contactName, phoneNumber, location, views } = contact
  const { type, coordinates } = location
  const [latitude, longitude] = coordinates

  try {
    await connectToDatabase()

    // const newContact = await Contact.create({
    //   contactName,
    //   phoneNumber,
    //   location: {
    //     type: "Point",
    //     coordinates: [
    //       parseFloat(latitude.toString()),  // Certifique-se de que são números
    //       parseFloat(longitude.toString())
    //     ]
    //   },
    //   views
    // })

    const response = await fetch('http://localhost:3333/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactName: contactName,
        phoneNumber: phoneNumber,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(latitude.toString()),  // Certifique-se de que são números
            parseFloat(longitude.toString())
          ]
        },
        views: views ?? 0
      })
    })

    console.log(response)

    if (response) {
      revalidatePath('/')
    }

    return response.ok
  } catch (error) {
    console.error(error)
  }
}

export async function getUserById(id: ObjectId) {
  try {
    await connectToDatabase()

    const user = await Contact.findById(id)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.error(error)
  }
}

export async function getContacts() {
  try {
    await connectToDatabase()

    const contact = await Contact.find()

    if (!contact) throw new Error('No contacts found')

    return JSON.parse(JSON.stringify(contact))
  } catch (error) {
    console.error(error)
  }
}

export async function updateContact(id: string, contact: ContactProps) {
  const { contactName, phoneNumber, location, views } = contact
  const { type, coordinates } = location
  const [latitude, longitude] = coordinates

  console.log(contact)

  try {
    await connectToDatabase()

    // const updatedContact = await Contact.findOneAndUpdate({ _id: id }, user)

    const response = await fetch(`http://localhost:3333/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contactName: contactName,
        phoneNumber: phoneNumber,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(latitude.toString()),  // Certifique-se de que são números
            parseFloat(longitude.toString())
          ]
        },
        views: views ?? 0
      })
    })

    if (!response.ok) throw new Error('Contact update failed')

    if (response) {
      revalidatePath('/')
    }

    return response.ok
  } catch (error) {
    console.error(error)
  }
}

export async function deleteContact(id: string) {
  try {
    await connectToDatabase()

    const deletedContact = await Contact.findByIdAndDelete({ _id: id })

    if (!deletedContact) throw new Error('Contact delete failed')

    if (deletedContact) {
      revalidatePath('/')
    }

    return JSON.parse(JSON.stringify(deletedContact))

  } catch (error) {
    console.error(error)
  }
}