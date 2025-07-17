import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from '../firebase/config';
import google from '../assets/icons/Google.png';
import github from '../assets/icons/github.png';
import { signInWithPopup } from "firebase/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import logo from '../assets/icons/logo.png'; // Assuming you have a logo image

function SignupCard() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        streak: 0,
        createdOn: '',
        rating: 0
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("Google Sign-in Success:", result.user);
            navigate('/tasks');
        } catch (error: any) {
            console.error("Google Sign-in Error:", error);
            setError(error.message || 'Google sign-in failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGitHubSignIn = async () => {
        setIsLoading(true);
        setError('');
        try {
            const result = await signInWithPopup(auth, githubProvider);
            console.log("GitHub Sign-in Success:", result.user);
            navigate('/tasks');
        } catch (error: any) {
            console.error("GitHub Sign-in Error:", error);
            setError(error.message || 'GitHub sign-in failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const { email, password, username } = formData;
        
        if (!username.trim()) {
            setError("Username cannot be empty!");
            setIsLoading(false);
            return;
        }
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed up:', user);
            navigate('/tasks');
        } catch (e: any) {
            if (e.code === "auth/email-already-in-use") {
                setError("This email is already registered. Please log in instead.");
            } else {
                console.error('Signup error:', e.message);
                setError(e.message || 'Sign up failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
            <div className="w-full max-w-4xl">
                <Card className="overflow-hidden shadow-2xl bg-white/95 backdrop-blur-sm">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Left side - Image and branding */}
                        <div className="hidden md:flex flex-col items-center justify-center p-8 dark:bg-oxford_blue-400 text-white">
                            <div className="mb-8">
                                <img 
                                    src={logo} 
                                    alt="signup design" 
                                    className="w-80 h-auto opacity-90 drop-shadow-lg"
                                />
                            </div>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
                                <p className="text-indigo-100 text-lg">
                                    Create your account and start your journey to become a Mayor!
                                </p>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="p-8 md:p-12">
                            <div className="max-w-md mx-auto">
                                <CardHeader className="text-center mb-8 p-0">
                                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                                        Create Account
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Sign up to get started with your account
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <div className="space-y-6">
                                        {error && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Social Sign-up Buttons */}
                                        <div className="space-y-3">
                                            <button
                                                onClick={handleGoogleSignIn}
                                                disabled={isLoading}
                                                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            >
                                                <img src={google} alt="Google" className="w-5 h-5 mr-3" />
                                                <span className="text-gray-700 font-medium">Sign up with Google</span>
                                            </button>

                                            <button
                                                onClick={handleGitHubSignIn}
                                                disabled={isLoading}
                                                className="w-full flex items-center justify-center px-4 py-3 border border-gray-800 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors disabled:opacity-50"
                                            >
                                                <img src={github} alt="GitHub" className="w-5 h-5 mr-3" />
                                                <span className="text-white font-medium">Sign up with GitHub</span>
                                            </button>
                                        </div>

                                        {/* Divider */}
                                        <div className="relative">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-gray-300"></div>
                                            </div>
                                            <div className="relative flex justify-center text-sm">
                                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                            </div>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Enter your username"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Enter your email"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                                    placeholder="Create a password"
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-6"
                                            >
                                                {isLoading ? (
                                                    <div className="flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Creating Account...
                                                    </div>
                                                ) : (
                                                    'Sign Up'
                                                )}
                                            </button>
                                        </form>

                                        <div className="text-center">
                                            <p className="text-gray-600">
                                                Already have an account?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/login')}
                                                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                                                >
                                                    Sign in
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
    );
}

export default SignupCard;