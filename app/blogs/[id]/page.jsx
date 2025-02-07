'use client';
import { assets } from '@/assets/assets';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get('/api/blog', {
          params: {
            id: params.id
          }
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [params.id]);

  const socialIcons = [
    { src: assets.linkedin_icon, title: "LinkedIn Share", alt: "Linkedin share" },
    { src: assets.twitter_dark_icon, title: "Twitter Share",  alt: "Twitter share" },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-6 px-4">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center max-w-md shadow-lg">
              <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
              <p className="text-xl text-gray-800 mb-4">Oops! Blog Not Found</p>
              <p className="text-gray-600 mb-6">The blog you're looking for seems to have wandered off.</p>
              <Link 
                href="/" 
                className="inline-block bg-black text-white px-6 py-3 rounded-lg 
                transition-all duration-500 ease-in-out 
                transform hover:-translate-y-2 
                hover:bg-gray-900 
                hover:shadow-[rgba(0,0,0,0.3)_-7px_7px_15px] 
                active:translate-x-0 active:translate-y-0 
                active:shadow-none"
              >
                Return Home
              </Link>
            </div>
          </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white flex-grow">
        {/* Header Section */}
        <header className="container mx-auto px-4 md:px-12 lg:px-28 py-5">
          <div className="flex justify-between items-center">
            <Link href='/' className="transition-transform duration-300 hover:scale-105">
              <Image 
                src={assets.logo} 
                alt="logo image" 
                width={180} 
                className="w-[130px] sm:w-auto" 
              />
            </Link>
            <Link href='/admin' title='Add blogs' className="flex items-center gap-2 font-medium 
              py-1 px-3 sm:py-3 sm:px-6 
              border border-black 
              shadow-[-7px_7px_0px_#000000]
              hover:translate-x-[-7px] hover:translate-y-[7px] 
              hover:shadow-none 
              transition-all duration-300 
              group">
              Add blogs
              <Image 
                src={assets.arrow} 
                alt="arrow icon"
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </header>

        {/* Rest of the component remains the same as in the original code */}
        {/* Title Section */}
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold max-w-[700px] mx-auto leading-tight">
            {data.title}
          </h1>
          <div className="mt-8 space-y-2">
            <Image 
              className="mx-auto border-4 border-white rounded-full shadow-lg" 
              src={data.authorImg} 
              alt="author image" 
              width={60} 
              height={60} 
            />
            <p className="text-lg text-gray-700">{data.author}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 max-w-[800px] -mt-16 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image 
              className="w-full h-auto" 
              src={data.image} 
              alt="blog image" 
              width={1280} 
              height={720}
              priority
            />
            <div className="p-6 md:p-8 space-y-6">
              <div className="blog-content" dangerouslySetInnerHTML={{ __html:data.description }}></div>

              {/* Social Share Section */}
              <div className="pt-12 border-t">
                <p className="font-semibold text-gray-900 mb-4">
                  Share this article on social media
                </p>
                <div className="flex space-x-4">
                  {socialIcons.map((icon, index) => (
                    <button 
                      key={index}
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      <Image
                        title={icon.title} 
                        src={icon.src} 
                        width={50} 
                        alt={icon.alt}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;