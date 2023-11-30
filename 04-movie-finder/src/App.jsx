import { useState } from 'react'
import './App.css'
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import { useRef } from 'react'

//useRef es como un useState pero cada vez que cambia no se vuelve a renderizar el componente
//también nos permite hacer bastantes cosas más

function App() {
  const {movies} = useMovies()
  const inputRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const value = inputRef.current.value 
    alert(value)
  }
  
  return (
    <div className='page'>
      <header>
        <h1>Buscador de pelis</h1>
        <form action="" onSubmit={handleSubmit}>
          <input ref={inputRef} placeholder='Avengers, Star Wars ...'/>
          <button type='Submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies}/>      
     </main>
    </div>
  )
}

export default App
