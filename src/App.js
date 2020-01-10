import React, { useState } from 'react';
import './App.css';
import NavigationBar from "./components/NavigatationBar/NavigationBar";
import DustMap from "./components/DustMap/DustMap";
import DustGraph from './components/DustGraph/DustGraph';
import PhayaoMap from "./components/PhayaoMap/PhayaoMap";
import { useGlobal } from "reactn";

function App() {

   const [isOpen, setIsOpen] = useGlobal('isOpen');

  const mux = (isOpen) =>{
    if(isOpen[0]){
      return <DustMap />
    }
    if(isOpen[1]){
      return <DustGraph />
    }
    if(isOpen[2]){
      return <PhayaoMap />
    }
  }

  return (
    <div className="App">
      <NavigationBar />
      {
        mux(isOpen)
      }
    </div>
  );
}

export default App;
