import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import BodyText from '../components/BodyText';
import Demo from '../components/Demo';
import Social from '../components/Social';
import Features from '../components/Features';
import PricingSection from '../components/Pricing';

function Landing() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8">
      {/* Header (Resizable?) */}
      <Header />

      {/* Hero Section */}
      <section id='' className="flex flex-wrap justify-center gap-16 my-7 w-full max-w-7xl">
        <div>
          <BodyText handlesignup={handleSignup} handlelogin={handleLogin} />
        </div>
        <div>
          <Demo />
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className="w-full max-w-7xl px-4">
        <Features />
      </section>

      <section id ='pricing'>
        <PricingSection/>
      </section>
      {/* Social Footer */}
      <section id="socials" className="mt-12 mb-24">
        <Social />
      </section>
    </div>
  );
}

export default Landing;
