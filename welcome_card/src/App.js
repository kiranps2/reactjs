import logo from './logo.svg';
import './App.css';
import image from "./images/luffy.webp"

function App() {
  let name="KIRAN";
  console.log("react app started");
  return (
    <>
    <div className="App text-start">
      <h1 className="display-1">Welcome to React Learning,</h1>
      <h1 className="display-4">{name}</h1>
      
    </div>
    <div className="card mx-auto" style={{ width: "200px" }}>
  <img src={image} className="img-fluid" alt="..."/>
  <div className="card-body">
    <h5 class="card-title" style={{color:"blue",fontFamily: "Times New Roman, Georgia, serif"}}>title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div className="card mx-auto" style={{ width: "200px" }}>
  <img src="https://picsum.photos/400/300" className="img-fluid" alt="..."/>
  <div className="card-body">
    <h5 class="card-title" style={{color:"blue",fontFamily: "Times New Roman, Georgia, serif"}}>title</h5>
    <p className="card-text">Some quick example text to build on the cards title and make up the bulk of the card's content.</p>
  </div>
</div>

    </>
    
    
    
  );
}

export default App;
