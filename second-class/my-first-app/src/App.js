import React, {useEffect, useState} from 'react';
import './App.css';
import getGifs from './services/getGifs';
const apiUrl = 'https://api.giphy.com/v1/gifs/search?apiKey=k3M9Fic8EZqvs5gpANdLITkHBI8Db2Ke&q=panda&limit=10'



function App() {
  const [gifs, setGifs] = useState([])
  
  //Se va a ejecutar cada vez que se renderice nuestro componente
  useEffect(function () {
    getGifs().then(gifs => setGifs(gifs))
  }, [])

  return (
    <div className="App">
      <section className="App-content">
        {
          //Por cada gif en el array renderizame la imagen
          gifs.map(
            singleGif => <img src={singleGif}/>
          )
        }
      </section>
    </div>
  );
}

export default App;