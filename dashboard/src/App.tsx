import { useEffect, useState } from "react";
import { api } from "./lib/axios";

function App() {
  const [notificationsList, setNotificationsList] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const newSocket = new WebSocket(`wss://lista-telefonica-lavid.onrender.com/alert/1`);
  // const newSocket = new WebSocket(`ws://localhost:3333/alert/all`);

  // useEffect(() => {
  //   newSocket.onopen = () => {
  //     console.log('Connected to server');
  //   };

  //   newSocket.onmessage = (event) => {
  //     const newNotification = event.data;
  //     setNotificationsList(prevList => [...prevList, newNotification]);
  //   };

  //   newSocket.onclose = () => {
  //     console.log('Connection closed');
  //   };

  //   // return () => {
  //   //   newSocket.close();
  //   // };
  // }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await api.post('/user', {
      username: email,
      password
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Erro ao registrar: ', error);
      });


  }

  return (
    <div className='w-screen h-screen bg-zinc-800 flex items-center justify-center gap-5'>
      <iframe style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }} width="520" height="580" src="https://charts.mongodb.com/charts-lista-telefonica---lavid-ihdmzix/embed/charts?id=f27df575-59f8-4a7a-a8ae-7e59cd56f2a0&maxDataAge=2592000&theme=light&autoRefresh=true"></iframe>

      <ul className="w-52 h-96 overflow-y-scroll flex flex-col gap-2 text-zinc-800 bg-zinc-100 rounded-md p-2">
        {notificationsList.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">enviar</button>
      </form>
    </div>
  )
}

export default App
