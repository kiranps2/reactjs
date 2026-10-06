import logo from './logo.svg';
import './App.css';

function App() {
  let food=["biriyani","mandi","shawaya","putt","dosa"];
  let foodname=[];
  
  for (let i = 0; i < food.length; i++) {
    function showmessage(){
    document.getElementById("message"+ i).innerText="I love this " + food[i] + "!"
  }
    foodname.push(<li key={i}>{food[i]} <button onClick={showmessage}>
          Show Message
        </button>

        <p id={"message" + i}></p></li>);
  }
  return (
    <div className="container mt-5">

      <h1 className="text-center mb-4">
        My Favorite Foods
      </h1>

      <ul className="list-group">
        {foodname}
      </ul>

    </div>
  );
}

export default App;
