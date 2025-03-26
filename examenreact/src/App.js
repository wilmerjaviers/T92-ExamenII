import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Empleado from "./components/Empleado";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Empleado />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
