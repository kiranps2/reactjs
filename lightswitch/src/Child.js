import React from "react";

function LightSwitch({ isOn, onToggle }) {
  return (
    <button onClick={onToggle}>
      {isOn ? "Turn OFF" : "Turn ON"}
    </button>
  );
}

export default LightSwitch;