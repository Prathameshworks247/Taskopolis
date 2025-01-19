import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BodyText from '../components/BodyText';
import Demo from '../components/Demo';
function Landing() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginBottom: '300px' }}>
        <br />
      <Header />
      </div>

      <div className='d-flex gap-5' style={{ marginBottom: '300px' }}>
      <BodyText handlesignup={handleSignup} handlelogin={handleLogin} />
      <Demo/>
      </div>
      
      
    </div>
  );
}

export default Landing;
