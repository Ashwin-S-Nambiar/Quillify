'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const validateField = (name, value) => {
    if (!value || value.trim() === '') {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {
      email: validateField('email', data.email),
      password: validateField('password', data.password)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', data);
      
      if (response.data.success) {
        toast.success('Login successful!');
        router.replace('/admin/addProduct');
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-8 text-center">Admin Login</h1>
        
        <form onSubmit={onSubmitHandle} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="email" className="text-xl block">Email:</label>
            <input 
              id="email"
              name="email" 
              onChange={onChangeHandle} 
              value={data.email} 
              className={`w-full px-4 py-3 border rounded-md transition-all duration-300 ${
                errors.email ? 'border-red-500' : ''
              }`}
              type="email" 
              placeholder="Enter your email" 
            />
            {errors.email && (
              <div className="text-red-500 text-sm animate-[fadeIn_0.3s_ease-in-out]">
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <label htmlFor="password" className="text-xl block">Password:</label>
            <input 
              id="password"
              name="password" 
              onChange={onChangeHandle} 
              value={data.password} 
              className={`w-full px-4 py-3 border rounded-md transition-all duration-300 ${
                errors.password ? 'border-red-500' : ''
              }`}
              type="password" 
              placeholder="Enter your password" 
            />
            {errors.password && (
              <div className="text-red-500 text-sm animate-[fadeIn_0.3s_ease-in-out]">
                {errors.password}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full h-12 rounded-md bg-black text-white hover:bg-gray-800 hover:-translate-y-2 transition-all duration-300 ease-in-out transform active:scale-95 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;