import './App.scss';
import React, { useEffect, useState } from "react";
import { CamigosBrowser } from './routes/CamigosBrowser';
import { CamigosProvider } from './context/CamigosContext';

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
