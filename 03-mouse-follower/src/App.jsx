import './Index.css'
import { useEffect, useState } from 'react'

function App() {
  const[enabled, setEnabled] = useState(false)
  const[position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({x: clientX, y: clientY})
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //cuando el componente se desmonta y cuando cambian las dependencias
    //antes de ejecutar el efecto de nuevo
    return () => {
      setPosition({x:0, y:0})
      window.removeEventListener('pointermove', handleMove)
    }
    
  }, [enabled])

  const handleClick = () => {
    setEnabled(!enabled)
  }

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09F',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px,${position.y}px)`
      }}/>
      <h1>Proyecto 3</h1>
      <button onClick={handleClick}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </main>
      
    
    
  )
}

export default App
