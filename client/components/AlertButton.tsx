import { ContactProps } from '@/types';
import React, { useState } from 'react'

interface AlertButtonProps {
  contact: ContactProps
}

function AlertButton({ contact }: AlertButtonProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isEmitted, setIsEmitted] = useState(contact.alertEmitted ? true : false);

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
        setIsEmitted(!isEmitted);
      }

      newSocket.onclose = () => {
        console.log('Connection closed');
      };

      setSocket(newSocket);

      return
    }
  }

  return (
    <button className={isEmitted ? 'bg-red-500 rounded-md p-1' : ''} onClick={() => emitAlert(contact._id)}>{isEmitted ? 'Emitido' : 'Alertar'}</button>
  )
}

export default AlertButton