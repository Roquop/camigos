import './App.scss';
import React from "react";
import { CamigosBrowser } from './routes/CamigosBrowser';
import { CamigosProvider } from './context/CamigosContext';
//la función principal, en la que irá todo lo demás. Como estamos usando el hook de useContext, toda la página tiene que ir envuelta en el CamigosProvider, que es lo que nos permitirá importar el context desde cualquier página de manera eficaz.
//DE AQUÍ, EL SIGUIENTE ARCHIVO COMENTADO es el que se encuentra en database>Camigos.sql, al mismo nivel que client y server.
function App() {

  return (
    <div className="App">
      <CamigosProvider>
        <CamigosBrowser />
      </CamigosProvider>
    </div>
  );
}

export default App;
