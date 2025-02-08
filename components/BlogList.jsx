'use client'
import React, { useState, useEffect } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="flex items-center space-x-2 pt-4">
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  </div>
);

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
      setError(null);
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
              py-2 px-4 rounded-lg
              transition-all duration-300 ease-in-out
              transform hover:-translate-y-1
              ${menu === category 
                ? 'bg-black text-white shadow-lg' 
                : 'bg-white text-black border border-black hover:bg-gray-100'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">{error}</p>
          <button 
            onClick={fetchBlogs}
            className="mt-4 px-6 py-2 bg-black text-white rounded-lg
              hover:bg-gray-800 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {isLoading ? (
          // Show 6 skeleton cards while loading
          [...Array(6)].map((_, index) => (
            <div key={index} className="transform transition-all duration-300 hover:-translate-y-2">
              <BlogSkeleton />
            </div>
          ))
        ) : (
          blogs
            .filter((blog) => menu === "All" ? true : blog.category === menu)
            .map((blog) => (
              <div key={blog._id} className="transform transition-all duration-300 hover:-translate-y-2">
                <BlogItem 
                  id={blog._id}
                  title={blog.title} 
                  description={blog.description}
                  category={blog.category} 
                  image={blog.image} 
                  author={blog.author}
                  authorImg={blog.authorImg}
                />
              </div>
            ))
        )}
      </div>

      {/* Show message when no blogs match the selected category */}
      {!isLoading && blogs.length > 0 && 
       blogs.filter((blog) => menu === "All" ? true : blog.category === menu).length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No blogs found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default BlogList;