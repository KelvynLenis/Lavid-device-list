"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function AlertComponent() {
  const param = useParams()
  const [notificationsList, setNotificationsList] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Cria a conexão WebSocket apenas uma vez
    const newSocket = new WebSocket(`ws://localhost:3333/alert/${param.id}`);
    // const newSocket = new WebSocket(`wss://lista-telefonica-lavid.onrender.com/alert/${param.id}`);
    newSocket.onopen = () => {
      console.log('Connected to server');
    };

    newSocket.onmessage = (event) => {
      const newNotification = event.data;
      setNotificationsList(prevList => [...prevList, newNotification]);
    };

    newSocket.onclose = () => {
      console.log('Connection closed');
    };

    // Salva o socket no estado
    setSocket(newSocket);

    // Limpeza da conexão WebSocket ao desmontar o componente
    return () => {
      newSocket.close();
    };

  }, []); // Dependência no id para criar um novo socket se mudar

  function sendMessage() {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage(""); // Limpa o campo de mensagem após o envio
    } else {
      console.error('Socket is not open');
    }
  }

  return (
    <main className="flex gap-10">
      <div className="flex flex-col gap-2 items-center">
        <label className="text-zinc-100">Enter your message</label>
        <input className="h-fit rounded-md p-2" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className="w-40 h-10 self-center bg-white rounded-md hover:bg-green-400 hover:text-zinc-100" onClick={sendMessage}>Send</button>
        {/* <button className="w-40 h-10 self-center bg-white rounded-md hover:bg-green-400 hover:text-zinc-100" onClick={closeSocket}>close</button> */}
      </div>

      <ul className="flex flex-col bg-zinc-200 w-40 h-80 text-zinc-950">
        {notificationsList.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </main>
  )
}

export default AlertComponent