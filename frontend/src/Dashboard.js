import React, { useState } from 'react';
import { BASE_URL } from './config';

const Dashboard = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if(!searchEmail) return alert("Enter email!");

    try {
      const response = await fetch(`${BASE_URL}/${searchEmail}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const fetchedData = await response.json(); // Assume the response is in JSON format

      setEmailData(fetchedData); // Set fetched data to state
    } catch (err) {
      console.error(err)
    }
  }
  
  const handleSearch = async (e) => {
    e.preventDefault();
    // Show loading state
    setLoading(true);
    setInterval(fetchData, 1500);
    setLoading(false);
  };

  function convertToIST(utcTimestamp) {
    if(!utcTimestamp) return "N/A";
    return new Date(utcTimestamp).toLocaleString();
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="email"
          placeholder="Search by Email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      <button
        type="submit"
        className="ml-4 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 flex items-center justify-center w-32"  // Adjusted width
      >
        {loading ? (
          <span className="w-5 h-5 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></span>
        ) : (
          'Search'
        )}
      </button>

      </form>
      
      {emailData && <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
              <th className="py-2 px-4 border-b">Expected reply time</th>
            </tr>
          </thead>
          <tbody>
            {emailData.map((data, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{data.email}</td>
                <td className="py-2 px-4 border-b">{data.status}</td>
                <td className="py-2 px-4 border-b">{data.timestamp}</td>
                <td className="py-2 px-4 border-b">{convertToIST(data.expectedReplyTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Dashboard;
