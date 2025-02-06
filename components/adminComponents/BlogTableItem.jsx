import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

const BlogTableItem = ({ mongoId, title, author, authorImg, date, deleteBlog }) => {
  const formattedDate = date ? format(new Date(date), 'MMM dd, yyyy') : 'N/A';

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <Image
              className="h-10 w-10 rounded-full object-cover border border-gray-200"
              src={authorImg}
              alt={author}
              width={40}
              height={40}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{author}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 line-clamp-2">{title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          onClick={() => deleteBlog(mongoId)}
          className="text-red-600 hover:text-red-800 font-medium 
            transition-colors duration-200 
            hover:bg-red-50 px-3 py-1 rounded-md
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;