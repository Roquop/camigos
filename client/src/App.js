import './App.scss';
import React from "react";
import { CamigosBrowser } from './routes/CamigosBrowser';
import { CamigosProvider } from './context/CamigosContext';
//la función principal, en la que irá todo lo demás. Como estamos usando el hook de useContext, toda la página tiene que ir envuelta en el CamigosProvider, que es lo que nos permitirá importar el context desde cualquier página de manera eficaz.
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
