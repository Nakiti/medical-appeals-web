import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="text-gray-800 hover:shadow-sm hover:border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-sm" />
          Medical Appeals
        </div>
        <Link
          href="/login"
          className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:opacity-90 transition font-semibold text-sm"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
