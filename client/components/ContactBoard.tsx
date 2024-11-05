"use client"

import { deleteContact, updateContact } from "@/lib/actions/contact.actions"
import { useState } from "react"
import { Input } from "./Input"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import AlertButton from "./AlertButton"
import { PhoneProps } from "@/types"

export function ContactBoard({ contacts }: { contacts: PhoneProps[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contact, setContact] = useState<PhoneProps>()
  const [socket, setSocket] = useState<WebSocket | null>(null);

  function openModal(contact: PhoneProps) {
    setIsModalOpen(!isModalOpen)
    setContact(contact)
  }

  function emitAlert(id: string) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send("Alerta de emergência!");
    } else {

      console.error('Socket is not open. Openning socket...');

      // const newSocket = new WebSocket(`wss://lista-telefonica-lavid.onrender.com/alert/${id}`);
      const newSocket = new WebSocket(`ws://localhost:3333/alert/${id}`);

      newSocket.onopen = () => {
        console.log('Connected to server');
        newSocket.send("Alerta de emergência!");
      };

      newSocket.onmessage = (event) => {
        console.log(event.data);
      }

      newSocket.onclose = () => {
        console.log('Connection closed');
      };

      setSocket(newSocket);

      return
    }
  }

  async function handleDeleteContact(contactId: string) {

    try {
      await deleteContact(contactId)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="w-3/5 flex flex-col items-center">
        <h1 className="text-2xl text-zinc-800">Contatos</h1>
        <ul className="bg-zinc-700 rounded-md w-full h-full px-10 py-4 text-zinc-100 gap-2 flex flex-col overflow-y-scroll">
          {
            contacts.map((contact) => (
              <li className="flex justify-between gap-0.5 hover:bg-zinc-500 p-1 rounded-sm" key={contact._id}>
                <Link href={`/${contact._id}/alert`} className="flex flex-col">
                  <span>{contact.phone_model}</span>
                  <span>{contact.phone_number}</span>
                </Link>
                <div className="flex gap-2">
                  {/* <button onClick={() => openModal(contact)}>edit</button>
                  <button onClick={() => handleDeleteContact(contact._id)}>delete</button> */}
                  <button onClick={() => emitAlert(contact._id)}>Alertar</button>
                  {/* <AlertButton contact={contact} /> */}
                </div>
              </li>
            ))
          }
        </ul>
      </div>

      {
        isModalOpen && (
          <Modal contact={contact} setIsModalOpen={setIsModalOpen} />
        )
      }
    </>
  )
}

interface ModalProps {
  contact: PhoneProps | undefined
  setIsModalOpen: (value: boolean) => void
}

const Modal = ({ contact, setIsModalOpen }: ModalProps) => {
  const [newPhoneModel, setNewPhoneModel] = useState(contact?.phone_model)
  const [newPhoneNumber, setNewPhoneNumber] = useState(contact?.phone_number)
  const [newLatitude, setNewLatitude] = useState(contact?.point?.coordinates[0] || 0)
  const [newLongitude, setNewLongitude] = useState(contact?.point?.coordinates[1] || 0)

  function submit() {
    onSubmit()
  }

  async function onSubmit() {

    console.log(contact!._id)

    try {
      // const updatedContact = await updateContact(
      //   contact!._id,
      //   {
      //     phone_model: newPhoneModel!,
      //     phone_number: newPhoneNumber!,
      //     location: { type: 'Point', coordinates: [newLatitude!, newLongitude!] },
      //   })

      // console.log(updatedContact)

      // if (updatedContact) {
      //   setIsModalOpen(false)
      // }

      console.log('To do: update contact')

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-zinc-700 w-1/4 h-fit flex flex-col items-center gap-4 p-4 rounded-sm">
        <button className="absolute bg-zinc-100 self-end rounded-full px-2 hover:bg-red-500 hover:text-zinc-100 transition-all duration-150 ease-in" onClick={() => setIsModalOpen(false)}>X</button>
        <h1 className="text-zinc-100">Editar contato</h1>
        <Input className="w-26" type="text" placeholder="Nome do contato" value={newPhoneModel} onChange={(e) => setNewPhoneModel(e.target.value)} />
        <Input className="w-26" type="text" placeholder="Telefone" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
        <Input className="w-26" type="number" placeholder="Latitude" value={newLatitude} onChange={(e) => setNewLatitude(Number(e.target.value))} />
        <Input className="w-26" type="number" placeholder="Longitude" value={newLongitude} onChange={(e) => setNewLongitude(Number(e.target.value))} />
        <button className="bg-zinc-100 px-2 rounded-md hover:bg-green-400 hover:text-zinc-100 duration-150 transition-all ease-in" onClick={submit}>Salvar</button>
      </div>
    </div>
  )
}