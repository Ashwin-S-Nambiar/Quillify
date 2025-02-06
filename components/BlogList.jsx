'use client'
import React, { useState, useEffect } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  },[]);

  const categories = ['All', 'Technology', 'Startup', 'Lifestyle'];

  return (
    <div className="container mx-auto px-4 md:px-12 lg:px-28">
        <div className="flex flex-wrap justify-center gap-4 my-10">
            {categories.map((category) => (
                <button 
                    key={category}
                    title={category}
                    onClick={() => setMenu(category)} 
                    className={`
                        py-2 px-4 rounded-sm 
                        transition-all duration-300 
                        ${menu === category 
                            ? 'bg-black text-white' 
                            : 'bg-white text-black border border-black hover:bg-gray-100'
                        }`
                    }
                >
                    {category}
                </button>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogs
                .filter((blog) => menu === "All" ? true : blog.category === menu)
                .map((blog) => (
                    <BlogItem 
                        key={blog._id}
                        id={blog._id}
                        title={blog.title} 
                        description={blog.description}
                        category={blog.category} 
                        image={blog.image} 
                        author={blog.author}
                        authorImg={blog.authorImg}
                    />
                ))
            }
        </div>
    </div>
  );
}

export default BlogList;