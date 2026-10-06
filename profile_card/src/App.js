import logo from './logo.svg';
import './App.css';
import image from"./images/profile.jpg"
function App() {
  let name="kiran";
  let dis="he is a react developer and fullstack"
  return (
    <><div className="card mx-auto"  style={{
          width: "18rem",
          border: "2px solid black",
          padding: "10px",
          backgroundColor: "lightblue"
        }}>
          <div class="card-body">
    <h1 class="card-title">{name}</h1>
    <p class="card-text">{dis}</p>
  </div>
  <img src={image} class="card-img-top" alt="..."/>
  <img src="https://picsum.photos/400/300"  />
  
</div>
<div className="mx-auto">
  
</div>
</>
  );
}

export default App;
