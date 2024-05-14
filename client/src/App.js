import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, {useEffect, useState} from "react";

function App() {
  const [prueba, setPrueba] = useState("nada")
  useEffect(() => {
    axios
      .get("http://localhost:4000/users/admin/prueba")
      .then((res) => {setPrueba(res.data.result[0].nombre)})
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>{prueba}</p>
          Learn React o no
        </a>
      </header>
    </div>
  );
}

export default App;
