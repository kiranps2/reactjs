import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [username,setName]=useState("")
  const [email,setEmail]=useState("")
  const[place,setPlace]=useState("")
  const [submittedData, setSubmittedData] = useState(null);
   function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleEmailChange(event) {
    
    setEmail(event.target.value);
    
  }
  function handlePlaceChange(event) {
    
    setPlace(event.target.value);
  }
  const handleSubmit = (e) => {
  e.preventDefault();

  setSubmittedData({
    username: username,
    email: email,
    place: place
  });
};
  return (
    <div
className="container-fluid min-vh-100 d-flex justify-content-center align-items-center py-5"
style={{
background: 'linear-gradient(135deg, #e0eafc, #cfdef3)'
}}
>
<div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

    <div className="card border-0 shadow-lg rounded-4" >
      <div className="card-body p-4 p-md-5">

        <div className="text-center mb-4">
          <div
            className="bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center mb-3"
            style={{ width: '65px', height: '65px' }}
          >
            <i className="bi bi-person-plus-fill fs-2"></i>
          </div>

          <h2 className="fw-bold text-dark">Create Account</h2>
          <p className="text-secondary">
            Enter your details to get started
          </p>
        </div>

        <form >
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              <i className="bi bi-person me-2 text-primary"></i>
              Username
            </label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              id="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={handleNameChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              <i className="bi bi-envelope me-2 text-primary"></i>
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg rounded-3"
              id="email"
              placeholder="Enter your email"
              required
              onChange={handleEmailChange}
              value={email}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="place" className="form-label fw-semibold">
              <i className="bi bi-geo-alt me-2 text-primary"></i>
              Place
            </label>
            <input
              type="text"
              className="form-control form-control-lg rounded-3"
              id="place"
              placeholder="Enter your place"
              required
              onChange={handlePlaceChange}
              value={place}
            />
            
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 rounded-3 fw-semibold"
          >
            submit
            <i className="bi bi-arrow-right ms-2" onSubmit={handleSubmit}></i>
          </button>

          <p className="text-center text-secondary small mt-4 mb-0">
            Please ensure your details are correct.
          </p>
        </form>

      </div>
    </div>

  </div>
  <div className="mt-4">
  <h4>Entered Details</h4>
  <p>Username: {username}</p>
  <p>Email: {email}</p>
  <p>Place: {place}</p>
</div>
</div>
  );
}

export default App;
