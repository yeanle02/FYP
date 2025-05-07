"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <div className={`text-center transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <img 
          src="/afl_logo.png" 
          alt="AFL Logo" 
          className="w-48 h-48 mx-auto mb-4 transform transition-all duration-500 hover:scale-110"
        />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-100 bg-clip-text text-transparent text-reveal mb-8">
          Welcome To AFL Game Ranking System
        </h2>
        
        <div className="max-w-2xl mx-auto text-gray-300 mb-12 space-y-4">
          <p className="text-lg">
            Experience the next level of AFL game analysis with our advanced ranking system.
          </p>
          <p className="text-md">
            Our platform provides detailed team comparisons, match predictions, and comprehensive statistics
            to give you the deepest insights into AFL matches.
          </p>
        </div>

        <button
          onClick={() => router.push('/')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full
                    font-semibold transform transition-all duration-300 hover:scale-105
                    shadow-lg hover:shadow-blue-500/50 animate-glow"
        >
          Enter Application
        </button>
      </div>
    </main>
  );
}
