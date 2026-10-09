import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
   useEffect( () =>{
    console.log("Welcome message displayed");
  }, [ ]);
  return (
    
    <div className="App">
     <h1>"Hello, user! Welcome to our site."</h1>
    </div>
  );
}

export default App;
