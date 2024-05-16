import './App.scss';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CamigosBrowser } from './routes/CamigosBrowser';
import { CamigosProvider } from './context/CamigosContext';

function App() {
  const [prueba, setPrueba] = useState("nada")
  useEffect(() => {
    axios
      .get("https://camigos-production.up.railway.app/users/admin/prueba")
      .then((res) => { setPrueba(res.data.result[0].nombre) })
      .catch((err) => console.log(err));
  }, []);

  <p>{prueba}</p>
  return (
    <div className="App">
      <CamigosProvider>
        <CamigosBrowser />
      </CamigosProvider>
    </div>
  );
}

export default App;
