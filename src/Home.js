import React from 'react';
import { Button } from 'react-bootstrap';
import './css/home.css';

function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Welcome to My App</h1>
          <p className="lead text-center">Please log in to continue.</p>
          <div className="text-center">
            <Button variant="primary" href="/login">Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
