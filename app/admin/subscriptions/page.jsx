'use client'
import React, { useState, useEffect } from 'react'
import SubsTableItem from '@/components/adminComponents/SubsTableItem';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get('/api/email');
      setEmails(response.data.emails);
    } catch (error) {
      toast.error("Failed to fetch subscriptions.");
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: {
          id: mongoId
        }
      });
      if(response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error("Error while deleting email.")
      }
      fetchEmails();
    } catch (error) {
      toast.error("Failed to delete subscription.");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          All Subscriptions
        </h1>
        
        <div className="relative bg-white rounded-lg shadow-md border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" 
                      className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Subscription
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
                {emails.map((email, index) => (
                  <SubsTableItem
                    key={email._id || index}
                    deleteEmail={deleteEmail}
                    mongoId={email._id}
                    email={email.email}
                    date={email.date}
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