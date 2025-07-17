import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checks from '../assets/patterns/checks.png'
import {auth} from '../firebase/config'
import {signInWithEmailAndPassword } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import logo from '../assets/icons/logo.png';

function LoginCard() {
    const [formData, setFormData] = useState<{email:string, password:string}>({ email: '', password: '' });
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
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        const { email, password } = formData;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', { email });
            navigate('/tasks');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
            <div className="w-full max-w-4xl">
                <Card className="overflow-hidden shadow-2xl bg-white/95 backdrop-blur-sm">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Left side - Image and branding */}
                        <div className="hidden md:flex flex-col items-center justify-center p-8 dark:bg-oxford_blue-400  text-white">
                            <div className="mb-8">
                                <img 
                                    src={logo} 
                                    alt="login design" 
                                    className="w-80 h-auto opacity-90 drop-shadow-lg"
                                />
                            </div>
                            <div className="text-center">
                                <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                                <p className="text-indigo-100 text-lg">
                                    Sign in, your city needs you!!
                                </p>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="p-8 md:p-12">
                            <div className="max-w-md mx-auto">
                                <CardHeader className="text-center mb-8 p-0">
                                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                                        Sign In
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Enter your credentials to access your account
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {error && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                                {error}
                                            </div>
                                        )}

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
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-600">
                                                    Remember me
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                    Signing in...
                                                </div>
                                            ) : (
                                                'Sign In'
                                            )}
                                        </button>

                                        <div className="text-center">
                                            <p className="text-gray-600">
                                                Don't have an account?{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => navigate('/signup')}
                                                    className="text-indigo-600 hover:text-indigo-500 font-medium"
                                                >
                                                    Sign up
                                                </button>
                                            </p>
                                        </div>
                                    </form>
                                </CardContent>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
    );
}

export default LoginCard;