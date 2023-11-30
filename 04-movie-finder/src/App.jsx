import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelis</h1>
        <form action="">
          <input placeholder='Avengers, Star Wars ...'/>
          <button>Buscar</button>
        </form>
      </header>
      <main>
        Aquí irán las pelis
     </main>
    </div>
  )
}

export default App
