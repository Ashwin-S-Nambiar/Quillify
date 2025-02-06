'use client'
import { assets } from '@/assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

const Page = () => {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    image: '',
    title: '',
    author: '',
    description: ''
  });
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "",
    authorImg:"/author_img.png"
  });

  const validateField = (name, value) => {
    if (!value || value.trim() === '') {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    return '';
  };

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setData(prevdata => ({
        ...prevdata,
        [name]: value
    }));
    
    // Update error state for the changed field
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setErrors(prev => ({
      ...prev,
      image: file ? '' : 'Image is required'
    }));
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      image: !image ? 'Image is required' : '',
      title: validateField('title', data.title),
      author: validateField('author', data.author),
      description: validateField('description', data.description)
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    const formData = new FormData();
    formData.append('title', data.title); 
    formData.append('author', data.author); 
    formData.append('description', data.description); 
    formData.append('category', data.category); 
    formData.append('authorImg', data.authorImg); 
    formData.append('image', image);

    try {
        const response = await axios.post('/api/blog', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.success) {
            toast.success(response.data.msg);

            setData({
                title: "",
                description: "",
                category: "Startup",
                author: "",
                authorImg: "/author_img.png"
            });
            setImage(null);
            document.getElementById("image").value = null;
        } else {
            toast.error(response.data.msg || "Error while adding blog.");
        }
    } catch (error) {
        console.error("Axios error:", error);
        toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <form onSubmit={onSubmitHandle} className="space-y-6">
        <div className="flex flex-col space-y-4">
          <label htmlFor="image" className="text-xl">Upload thumbnail:</label>
          <div className="self-start">
            <label 
              htmlFor="image" 
              className="block w-full max-w-[280px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <Image 
                className="rounded-lg shadow-md" 
                src={image ? URL.createObjectURL(image) : assets.upload_area} 
                alt="upload icon" 
                width={280} 
                height={140} 
                objectFit="cover"
              />
            </label>     
            <input 
              onChange={handleImageChange}
              type="file" 
              id="image" 
              hidden 
              accept="image/*"
            />
            {errors.image && (
              <div className="text-red-500 text-sm mt-1 animate-[fadeIn_0.3s_ease-in-out]">
                {errors.image}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="title" className="text-xl block">Blog title:</label>
          <input 
            id="title"
            name="title" 
            onChange={onChangeHandle} 
            value={data.title} 
            className={`w-full px-4 py-3 border rounded-md transition-all duration-300 ${
              errors.title ? 'border-red-500' : ''
            }`}
            type="text" 
            placeholder="Type title here." 
          />
          {errors.title && (
            <div className="text-red-500 text-sm animate-[fadeIn_0.3s_ease-in-out]">
              {errors.title}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label htmlFor="author" className="text-xl block">Blog author:</label>
          <input 
            id="author"
            name="author" 
            onChange={onChangeHandle} 
            value={data.author} 
            className={`w-full px-4 py-3 border rounded-md transition-all duration-300 ${
              errors.author ? 'border-red-500' : ''
            }`}
            type="text" 
            placeholder="Type author name here." 
          />
          {errors.author && (
            <div className="text-red-500 text-sm animate-[fadeIn_0.3s_ease-in-out]">
              {errors.author}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label htmlFor="description" className="text-xl block">Blog description:</label>
          <textarea 
            id="description"
            name="description" 
            onChange={onChangeHandle} 
            value={data.description} 
            className={`w-full px-4 py-3 border rounded-md min-h-[150px] transition-all duration-300 ${
              errors.description ? 'border-red-500' : ''
            }`}
            placeholder="Type content here." 
          />
          {errors.description && (
            <div className="text-red-500 text-sm animate-[fadeIn_0.3s_ease-in-out]">
              {errors.description}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <label htmlFor="category" className="text-xl block">Blog category:</label>
          <select 
            id="category"
            name="category" 
            onChange={onChangeHandle} 
            value={data.category}
            className="cursor-pointer w-full md:w-64 px-4 py-3 border rounded-md text-gray-700 transition-all duration-300"
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>  
          </select>
        </div>

        <div>
          <button 
            type="submit" 
            className="w-full md:w-64 h-12 rounded-md bg-black text-white hover:bg-gray-800 hover:-translate-y-2 transition-all duration-300 ease-in-out transform active:scale-95"
          >
            Add Blog
          </button>
        </div>
      </form>   
    </div>
  );
}

export default Page;