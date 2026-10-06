import logo from './logo.svg';
import './App.css';

function App() {
  const name = "Alex";
  const age = 20;
  const isStudent = true;
  const favoriteHobbies = ["Reading", "Hiking", "Coding"];
  const headingColor = "lightblue";
  let hobbyList = [];
  for (let i=0;i<favoriteHobbies.length;i++){
    hobbyList.push(<li key={i}>{favoriteHobbies[i]}</li>);
  }
  function showEnthusiasm(){
    document.getElementById("message").innerText="Hello from React! I love my hobbies!";
    document.getElementById("heading").style.backgroundColor=headingColor;
  }
  return (
    <div className="container mt-5">
      <h1 id="heading" className="text-center p-3">
        Personal Information and Hobbies
      </h1>
      <div className="card shadow mt-4 p-3 mx-auto">
        <div className="card-body">
          <h3 className="card-title">Personal Details</h3>

          <p className="card-text">
            <strong>Name:</strong> {name}
          </p>

          <p className="card-text">
            <strong>Age:</strong> {age}
          </p>

          <p className="card-text">
            <strong>Student:</strong> {isStudent.toString()}
          </p>
        </div>
      </div>
      <h2 className="mt-5">My Hobbies - For Loop</h2>

      <ul>
        {hobbyList}
      </ul>
      <h2 className="mt-4">My Hobbies - Map()</h2>

      <ul>
        {favoriteHobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      <button
        className="btn btn-primary mt-3"
        onClick={showEnthusiasm}
      >
        Show Enthusiasm
      </button>
      <p id="message" className="mt-3">
        Click the button to see my enthusiasm!
      </p>
    </div>
  );
}

export default App;
