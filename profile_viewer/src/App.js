import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [user,setUser]=useState("guest")
  // let name="alice"
  useEffect( () =>{
    if (user=="alice"){
      console.log("user changed to",user);
    }
    
    
  }, [user]);

   const handleClick = () => {
    setUser("alice")
  };
  return (
    <div className="App">
      <h1>Welcome,{user} !</h1>
      <button onClick={handleClick}>Login as Alice</button>
      <h3 id='wel'></h3>
    </div>
  );
}

export default App;
