
import { useParams, Link } from 'react-router-dom';

function Student() {
  const { name } = useParams();

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome, {name}!</h1>
      <Link to="/" className="btn btn-primary mt-3">
        Back to Home
      </Link>
    </div>
  );
}

export default Student;
