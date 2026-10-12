import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';


function App() {
  const students=['Alexa', 'Riya', 'Rahul', 'Priya'];
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-primary">Student Names</h1>
        <p>Click a student name to view their page.</p>

        <ul className="list-group mb-4">
          {students.map((student) => (
            <li className="list-group-item" key={student}>
              <Link to={`/student/${student}`}>
                {student}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/student/Riya')}
        >
          Go to Riya
        </button>
      </div>
    </div>
  );
}

export default App;
