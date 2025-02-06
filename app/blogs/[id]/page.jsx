'use client';
import { assets } from '@/assets/assets';
import Footer from '@/components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    const response = await axios.get('/api/blog', {
      params: {
        id: params.id
      }
    });
    setData(response.data);
  };

  const socialIcons = [
    { src: assets.facebook_icon, alt: "Facebook share" },
    { src: assets.twitter_icon, alt: "Twitter share" },
    { src: assets.googleplus_icon, alt: "Google+ share" }
  ];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-semibold text-gray-800">404, Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-200 flex-grow">
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
            <button className="flex items-center gap-2 font-medium 
              py-1 px-3 sm:py-3 sm:px-6 
              border border-black 
              shadow-[-7px_7px_0px_#000000]
              hover:translate-x-[-7px] hover:translate-y-[7px] 
              hover:shadow-none 
              transition-all duration-300 
              group">
              Get started 
              <Image 
                src={assets.arrow} 
                alt="arrow icon"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </div>
        </header>

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