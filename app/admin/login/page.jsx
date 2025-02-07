'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const AdminAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      <div className="max-w-md w-full mx-auto bg-white rounded-xl 
        shadow-lg border border-gray-100 
        transform transition-all duration-500 
        hover:shadow-2xl hover:scale-[1.02]
        sm:p-8 p-4">
        <h1 className="text-3xl font-mono mb-8 text-center">
          Admin Login
        </h1>
        
        <form onSubmit={onSubmitHandle} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-lg font-mono font-regular block">Email</label>
            <input 
              id="email"
              name="email" 
              onChange={onChangeHandle} 
              value={data.email} 
              className={`font-mono w-full px-4 py-3 border rounded-lg 
                transition-all duration-300 
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              type="email" 
              placeholder="Enter your email" 
            />
            {errors.email && (
              <div className="font-mono text-red-500 text-sm pl-2 animate-slide-in-down">
                {errors.email}
              </div>
            )}
          </div>

          <div className="space-y-2 relative">
            <label htmlFor="password" className="text-lg font-mono font-regular block">Password</label>
            <div className="relative">
              <input 
                id="password"
                name="password" 
                onChange={onChangeHandle} 
                value={data.password} 
                className={`font-mono w-full px-4 py-3 border rounded-lg pr-12
                  transition-all duration-300 
                  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                  text-gray-500 hover:text-black 
                  transition-all duration-300"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="font-mono text-red-500 text-sm pl-2 animate-slide-in-down">
                {errors.password}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full h-12 rounded-lg font-mono bg-black text-white 
              hover:bg-gray-900 
              transition-all duration-300 ease-in-out 
              transform hover:-translate-y-1 
              active:scale-95 
              ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;