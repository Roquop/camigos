import './App.scss';
import axios from "axios";
import React, {useEffect, useState} from "react";
import { CamigosBrowser } from './routes/CamigosBrowser';

function App() {
  const [prueba, setPrueba] = useState("nada")
  useEffect(() => {
    axios
      .get("https://camigos-production.up.railway.app/users/admin/prueba")
      .then((res) => {setPrueba(res.data.result[0].nombre)})
      .catch((err) => console.log(err));
  }, []);
  
  <p>{prueba}</p>
  return (
    <div className="App">
     <CamigosBrowser/>
    </div>
  );
}

export default App;
