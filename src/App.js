import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigatationBar/NavigationBar";
import DustMap from "./components/DustMap/DustMap";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <DustMap />
    </div>
  );
}

export default App;
