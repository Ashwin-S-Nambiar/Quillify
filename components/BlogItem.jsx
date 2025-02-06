import Image from 'next/image';
import React from 'react';
import { assets } from '@/assets/assets';
import Link from 'next/link';

const BlogItem = ({ title, id, description, category, image, author, authorImg }) => {
  return (
    <div className="bg-white border border-black 
      transition-all duration-300 ease-in-out 
      hover:shadow-[-7px_7px_0px_#000000] 
      hover:scale-[1.02] 
      rounded-md overflow-hidden 
      group">
        <Link href={`/blogs/${id}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <Image 
              src={image} 
              alt="blog-image" 
              fill 
              className="object-cover transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
        </Link>
        <p className="ml-5 mt-5 px-1.5 py-0.5 rounded-sm inline-block bg-black text-white text-sm">
          {category}
        </p>
        <div className="p-5 space-y-3 flex flex-col h-full">
            <h5 className="text-lg font-medium tracking-tight text-gray-900">
              {title}
            </h5>
            <p className="text-sm tracking-tight text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}></p>
            <Link 
              title="Read more"
              href={`/blogs/${id}`} 
              className="inline-flex items-center font-semibold text-center 
                group/link hover:text-blue-600 
                transition-colors duration-300"
            >
                Read More 
                <Image 
                  src={assets.arrow} 
                  className="ml-2 transition-transform group-hover/link:translate-x-1" 
                  alt="arrow icon" 
                  width={12} 
                />
            </Link>

            {/* Author Section */}
            <div className="flex items-center px-5 py-2 space-x-3 border-t border-gray-200 pt-4 mt-auto">
              <Image 
                src={authorImg} 
                alt="author image" 
                width={40} 
                height={40} 
                className="rounded-full object-cover" 
              />
              <div>
                <span className="text-sm font-medium text-gray-800">{author}</span>
                {/* Optionally add the author's title or role below the name */}
                <span className="block text-xs text-gray-500">Author</span>
              </div>
            </div>
        </div>
    </div>
  );
}

export default BlogItem;