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
    document.getElementById("hell").innerHTML="hello "+user;
  };
  return (
    <div className="App">
      <h1>Welcome,{user} !</h1>
      <button onClick={handleClick}>Login as Alice
      
      </button>
      <p id="hell"></p>
    </div>
  );
}

export default App;
