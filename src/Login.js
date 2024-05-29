import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // After successful login, navigate to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="background">
      <div className="form-popup">
        <div className="form-box login">
          <div className="form-content">
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label>Password</label>
              </div>
              <button type="submit">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
