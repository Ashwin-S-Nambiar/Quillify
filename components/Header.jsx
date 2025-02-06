'use client'
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/assets';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Header = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim(); // Trim any spaces

    if (!isValidEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Check if email exists
      const checkResponse = await axios.get(`/api/email?email=${trimmedEmail}`);
      if (checkResponse.data.exists) {
          toast.info("This email is already subscribed.");
          return;
      }

      // If email does not exist, proceed to add it
      const response = await axios.post('/api/email', { email: trimmedEmail }, {
          headers: { 'Content-Type': 'application/json' }
      });

        if (response.data.success) {
            toast.success(response.data.msg);
            setEmail("");
        } 
        
        else {
            toast.error(response.data.msg || "Error while adding email.");
        }

    } 
    
    catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } 
    
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-12 lg:px-28 py-5">
      <div className="flex justify-between items-center">
        <Image 
          src={assets.logo} 
          width={180} 
          alt='logo image' 
          className="w-[130px] sm:w-auto transition-transform duration-300 hover:scale-105" 
        />
        <Link href="admin"
          title="Add new blogs" 
          className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 
          border border-solid border-black 
          shadow-[-7px_7px_0px_#000000] 
          hover:translate-x-[-7px] hover:translate-y-[7px] 
          hover:shadow-none 
          transition-all duration-300 
          active:scale-95 group">
          Add blogs
          <Image 
            src={assets.arrow} 
            alt='arrow icon' 
            className="transition-transform group-hover:translate-x-1" 
          />
        </Link>
      </div>
      <div className="text-center my-8 space-y-6">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="max-w-[740px] mx-auto text-xs sm:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat recusandae, voluptas architecto assumenda iure quia, exercitationem necessitatibus est maiores praesentium in similique quaerat quos nihil modi temporibus magnam soluta voluptates!
        </p>
        <form onSubmit={onSubmitHandle} 
          className="max-w-[500px] mx-auto mt-10 
          border border-black 
          shadow-[-7px_7px_0px_#000000] 
          focus-within:translate-x-[-7px] 
          focus-within:translate-y-[7px] 
          focus-within:shadow-none 
          transition-all duration-300 
          flex">
          <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 p-4 outline-none indent-3 
              focus:ring-1 focus:ring-black 
              transition-all duration-300" 
            disabled={loading} // Disable input while processing
          />
          <button 
            type="submit" 
            title="Subscribe"
            className="border-l border-black py-4 px-4 sm:px-8 
              bg-white 
              hover:bg-gray-100 
              active:bg-gray-200 
              transition-all duration-300 
              group disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading} // Disable button while processing
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;