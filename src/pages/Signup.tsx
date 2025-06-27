import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Social from '../components/Social';
import SignupCard from '../components/SignupCard';

function Signup() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginBottom: '100px', marginTop: '30px' }}>
            <Header />
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center' >
            <SignupCard />
        </div>
        <div className='d-flex'>
        <Social/>
        </div>
        </div>
    );
}

export default Signup;