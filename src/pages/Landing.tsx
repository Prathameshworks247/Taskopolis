import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BodyText from '../components/BodyText';
import Demo from '../components/Demo';
import Social from '../components/Social';
import Features from '../components/Features';
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
      <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginBottom: '100px', marginTop: '30px' }}>
      <Header />
      </div>

      <div className='d-flex gap-20 flex-wrap justify-content-center'>
      <div className='d-flex'><BodyText handlesignup={handleSignup} handlelogin={handleLogin} /></div>
      <div ><Demo/></div>
      </div>
      <div>
      <Features/>
      </div>
      <div className='d-flex' style={{ marginBottom: '100px' }}>
      <Social/>
      </div>
      
    </div>
  );
}

export default Landing;
