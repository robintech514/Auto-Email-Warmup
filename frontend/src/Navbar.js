import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Email Warmup</h1>
        <div className="space-x-4">
          <a href="/home" className="text-white hover:text-gray-300">Home</a>
          <a href="/dashboard" className="text-white hover:text-gray-300">Dashboard</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
