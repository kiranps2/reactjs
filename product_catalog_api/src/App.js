
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="brand">
          ElectroStore
        </Link>

        <Link to="/add" className="add-button">
          + Add Product
        </Link>
      </header>

      <Outlet />
    </div>
  );
}

export default App;
