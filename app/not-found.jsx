'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 404 Content */}
      <div className="flex-grow flex flex-col items-center justify-center bg-white space-y-6 px-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center max-w-md shadow-lg">
          <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
          <p className="text-2xl text-gray-800 mb-4">Page Not Found</p>
          <p className="text-gray-600 mb-6">
            The page you're looking for seems to have gotten lost in the digital wilderness.
          </p>
          <div className="flex justify-center space-x-4">
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
      </div>
    </div>
  );
}