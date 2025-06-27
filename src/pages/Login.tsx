import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Social from '../components/Social';
import LoginCard from '../components/LoginCard';
function Login() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ marginBottom: '100px', marginTop: '30px' }}>
            <Header />
        </div>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{ margin: '40px'}}>
            <LoginCard />
        </div>
        <div className='d-flex' style={{ marginBottom: '300px' }}>
        <Social/>
        </div>
        </div>
    );
}

export default Login;