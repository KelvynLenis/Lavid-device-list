import React from 'react'

function page() {
  return (
    <div className='w-screen h-screen bg-zinc-800 flex items-center justify-center'>
      <iframe style={{ background: '#FFFFFF', border: 'none', borderRadius: '2px', boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)' }} width="640" height="480" src="https://charts.mongodb.com/charts-lista-telefonica---lavid-ihdmzix/embed/charts?id=f27df575-59f8-4a7a-a8ae-7e59cd56f2a0&maxDataAge=2592000&theme=light&autoRefresh=true"></iframe>
    </div>
  )
}

export default page