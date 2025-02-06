import React from 'react';

const SubsTableItem = ({ deleteEmail, mongoId, email, date }) => {
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  }) : 'N/A';

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{email || "No email"}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formattedDate}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
        <button
          onClick={() => deleteEmail(mongoId)}
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

export default SubsTableItem;