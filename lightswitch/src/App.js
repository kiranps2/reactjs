import logo from './logo.svg';
import './App.css';
import React ,{ useState } from "react";
import LightSwitch from "./Child";

function App() {
  const [isOn, setIsOn] = useState(false);

  function toggleLight() {
    setIsOn(!isOn);
  }
  return (
    <div>
      <h2>
        {isOn ? "The room is dark" : "The room is bright"}
      </h2>

      <LightSwitch
        isOn={isOn}
        onToggle={toggleLight}
      />
    </div>
  );
}

export default App;
