import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


//useEffect() nos permite pasarle una función que se ejecutará cuando se monte el componente,
//y cuando cambien la lista de dependencias que nosotros le digamos. Así que como mínimo se ejecutará
//una vez

//Si no le pasamos una lista de dependencias, el useEffect se hará cada vez que se renderice el
//componente.

//Si le pasamos un array vacío como lista de dependencias, solo se renderizará cuando se monte el
//componente


function App() {
  useEffect(() => {

  }, [])

  return (
    
  )
}

export default App
