import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { getDatabase, ref, set } from 'firebase/database';
import {auth, googleProvider, githubProvider } from '../firebase/config';
import checks from '../assets/patterns/checks.png';
import or from '../assets/icons/OrDivider.png';
import google from '../assets/icons/Google.png';
import github from '../assets/icons/github.png';
import { signInWithPopup } from "firebase/auth";

function SignupCard() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        streak: 0,
        createdOn: '',
        rating: 0
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-in Success:", result.user);
            navigate('/tasks');
        } catch (error: any) {
            console.error("Google Sign-in Error:", error);
            alert(error.message);
        }
    };

    const handleGitHubSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log("GitHub Sign-in Success:", result.user);
            navigate('/tasks');
        } catch (error: any) {
            console.error("GitHub Sign-in Error:", error);
            alert(error.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, username } = formData;

        if (!username.trim()) {
            alert("Username cannot be empty!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User signed up:', user);
            navigate('/tasks');
        } catch (e: any) {
            if (e.code === "auth/email-already-in-use") {
                alert("This email is already registered. Please log in instead.");
            } else {
                console.error('Signup error:', e.message);
                alert(e.message);
            }
        }
    };

    return (
        <div className='signup-card d-flex justify-content-center align-items-center p-2 row bg-white'>
            <div className='d-flex justify-content-center align-items-center row bg-white'>
                <img className="checks-image" src={checks} alt="login design" style={{ width: '500px' }} />
                <h2 className='title-login d-flex justify-content-center align-items-center' style={{ marginTop: '40px' }}>
                    Create Account
                </h2>
            </div>

            <div className="form-container-login col-md-7">
                <button onClick={handleGoogleSignIn} className="bg-white rounded d-flex justify-content-center align-items-center text-black font-family-inter w-100 mb-4 fw-bold border">
                    <img className='col-1' style={{ transform: 'scale(0.6)' }} src={google} alt="Google" />
                    <div className='col-11'>Sign up with Google</div>
                </button>

                <button onClick={handleGitHubSignIn} className="bg-black rounded d-flex justify-content-center align-items-center text-black border font-family-inter w-100 mb-4 fw-bold">
                    <img className='col-1' style={{ transform: 'scale(0.6)' }} src={github} alt="Facebook" />
                    <div className='col-11 text-white'>Sign up with GitHub</div>
                </button>

                <img src={or} className="d-flex justify-content-center align-items-center" style={{ marginLeft: '60px', marginBottom: '20px' }} alt="Or Divider" />

                <form onSubmit={handleSubmit} className='login-form'>
                    <label>Username</label>
                    <input className="form-control" type="text" name="username" onChange={handleChange} required style={{ marginBottom: '20px' }} />

                    <label>Email</label>
                    <input className="form-control" type="email" name="email" onChange={handleChange} required style={{ marginBottom: '20px' }} />

                    <label>Password</label>
                    <input className="form-control" type="password" name="password" onChange={handleChange} required style={{ marginBottom: '50px' }} />

                    <button type="submit" className="btn bg-black text-white font-family-inter w-100">
                        Sign Up
                    </button>

                    <p className='fw-bold' style={{ marginBottom: '140px' }}>
                        Already Registered? <a href="#" onClick={() => navigate('/login')}>Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignupCard;
