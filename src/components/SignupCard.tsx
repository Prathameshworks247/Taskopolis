import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import checks from '../assets/patterns/checks.png';
import or from '../assets/icons/OrDivider.png'
function SignupCard() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formData;
    
        try {
          console.log('User logged in:', {
            email: email,
            password: password,
          });
        } catch (error) {
          console.error('Login error:', error);
        }
      };
    return (
    <div className='signup-card d-flex justify-content-center align-items-center p-2 row bg-white'>
        <div className='d-flex justify-content-center align-items-center  row bg-white'>
        <img className = "checks-image" src={checks} alt="login design" style={{width : '500px'}}/>
        <h2 className='title-login d-flex justify-content-center align-items-center' style={{marginTop: '40px'}}>Create Account</h2>
        </div>
        
        <div className="form-container-login  col-md-7">
            <button type="submit" className=" bg-white text-black font-family-inter w-100 mb-4 fw-bold border" >
              Sign up with Google
            </button>            
            <button type="submit" className=" bg-white text-black border font-family-inter w-100 mb-4 fw-bold" >
              Sign up with Facebook
            </button>
            <img src={or} className="d-flex justify-content-center align-items-center" style={{marginLeft:'60px',marginBottom:'20px'}} />
          <form onSubmit={handleSubmit} className='login-form'>
            <label>Email</label>
            <input style={{marginBottom: '20px'}} className="form-control" type="email" name="email" placeholder="" onChange={handleChange} required/>
            <label>Password</label>
            <input style={{marginBottom: '50px'}} className="form-control" type="password" name="password" placeholder="" onChange={handleChange} required/>
            <button type="submit" className="btn bg-black text-white font-family-inter w-100" >
              Log In
            </button>
            <p className='fw-bold' style={{marginBottom: '140px'}}>Not Registered? <a href="" onClick={()=>{
              navigate('/signup')
            }}>Sign Up</a></p>
          </form>
        <div/>
    </div>
    </div>
    )
}

export default SignupCard