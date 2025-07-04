import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checks from '../assets/patterns/checks.png'
import {auth} from '../firebase/config'
import {signInWithEmailAndPassword } from 'firebase/auth';
import {  Card, CardContent, CardDescription, CardHeader, CardTitle  } from './ui/card';

function LoginCard() {
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
        // Use await instead of .then()
        await signInWithEmailAndPassword(auth, email, password);
        
        console.log('User logged in:', {
          email: email,
          password: password,
        });
        // Navigate to the home page after successful login
        navigate('/tasks');
      } catch (err:any) {
        // Handle error if login fails
        alert(err.message);
      }
    };
    
    return (

    <div className='login-card d-flex justify-content-center align-items-center p-2 row bg-white'>
        <div className='d-flex justify-content-center align-items-center  row bg-white'>
        <img className = "checks-image" src={checks} alt="login design" style={{width : '500px'}}/>
        <h2 className='title-login d-flex justify-content-center align-items-center' style={{marginTop: '40px'}}>LOG IN</h2>
        </div>
        
        <div className="form-container-login justify-center flex-wrap flex">
          <form onSubmit={handleSubmit} className='login-form w-2/3 justify-center'>
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

export default LoginCard;