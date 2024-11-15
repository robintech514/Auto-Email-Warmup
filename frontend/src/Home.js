import React, { useState } from 'react';
import { BASE_URL } from './config';

const defaultData = {
  userEmail: '',
  appPassword: '',
  numberOfEmails: null,
  timeInterval: null,
  receiver: 'receiver@example.com'
}

const Home = () => {
  const [emailConfig, setEmailConfig] = useState(defaultData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailConfig({
      ...emailConfig,
      [name]: name === 'numberOfEmails' || name === 'timeInterval' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BASE_URL}/configure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailConfig),
      });
  
      const responseData = await response.json();
      if (response.ok) {
        alert('Configuration saved successfully!');
      } else {
        console.error('Error saving configuration:', responseData);
        alert('Failed to save configuration. Please try again.');
      }
    } catch (error) {
      // Handle errors in making the request
      console.error('Error:', error);
      alert('Failed to save configuration. Please check your network or try again later.');
    }
    setEmailConfig(defaultData)
  };
      

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Email Configuration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-600">User Email</label>
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={emailConfig.userEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="appPassword" className="block text-sm font-medium text-gray-600">App Password</label>
            <input
              type="password"
              name="appPassword"
              id="appPassword"
              value={emailConfig.appPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="numberOfEmails" className="block text-sm font-medium text-gray-600">Number of Emails Per Day</label>
            <input
              type="number"
              name="numberOfEmails"
              id="numberOfEmails"
              value={emailConfig.numberOfEmails}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="timeInterval" className="block text-sm font-medium text-gray-600">Interval in Minutes</label>
            <input
              type="number"
              name="timeInterval"
              id="timeInterval"
              value={emailConfig.timeInterval}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="receiver" className="block text-sm font-medium text-gray-600">Receiver's Email</label>
            <select
              name="receiver"
              id="receiver"
              value={emailConfig.receiver}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled
            >
              <option value="receiver@example.com">Default receiver email</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
