'use client'
import React, { useState, useEffect } from 'react'
import BlogTableItem from '@/components/adminComponents/BlogTableItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: {
          id: mongoId
        }
      });
      if(response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error("Error while deleting blog.")
      }
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  },[]);

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          All Blogs
        </h1>
        
        <div className="relative bg-white rounded-lg shadow-md border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" 
                      className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author Name
                  </th>
                  <th scope="col" 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blog Title
                  </th>
                  <th scope="col" 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" 
                      className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog, index) => (
                  <BlogTableItem 
                    key={blog._id || index}
                    deleteBlog={deleteBlog}
                    mongoId={blog._id}
                    title={blog.title}
                    author={blog.author}
                    authorImg={blog.authorImg}
                    date={blog.date}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;