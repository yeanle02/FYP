"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-black text-white">
      <button
        onClick={() => router.back()}
        className="fixed top-24 left-6 px-6 py-3 bg-gray-800/40 backdrop-blur-sm hover:bg-gray-700/60 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 border border-gray-600/30 shadow-lg hover:shadow-blue-500/20 group"
      >
        <span className="text-xl transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span className="font-medium tracking-wide">Back</span>
      </button>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-100 to-white bg-clip-text text-transparent">
            About Our Project
          </h1>
          
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-blue-100">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              A team of 5 data science students from Monash University developed this application which serves the purpose
              of providing accurate match predictions for the Australian Football League (AFL). Our model compares historical team game data
              to predict the present match outcome.
            </p>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm animate-card-glow">
              <h3 className="text-xl font-semibold mb-3 text-blue-100">Key Features</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Advanced match prediction algorithms</li>
                <li>Comprehensive team statistics</li>
                <li>Historical performance analysis</li>
              </ul>
            </div>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/afl_logo.png"
              alt="AFL Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="mb-20 bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm">
          <h2 className="text-3xl font-semibold text-blue-100 text-center mb-8">Our Team Members</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-blue-100 mb-2">Ekram</h3>
              
              <p className="text-gray-400">Team Member</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-blue-100 mb-2">Yeanle</h3>
            
              <p className="text-gray-400">Team Member</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-blue-100 mb-2">Kiyu</h3>
              <p className="text-gray-400">Team Member</p>
          
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-blue-100 mb-2">Kaixin</h3>
              <p className="text-gray-400">Team Member</p>
            
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30 hover:border-blue-500/30 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-blue-100 mb-2">Weiyuan</h3>
              <p className="text-gray-400">Team Member</p>
           
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm animate-card-glow">
          <h3 className="text-xl font-semibold mb-4 text-blue-100 text-center">Contact Us</h3>
          <p className="text-lg leading-relaxed text-center mb-6">
            We welcome your feedback and suggestions! Fill out the form below to get in touch with us.
          </p>
          
          <form 
            onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              message: formData.get('message')
            };

            try {
              const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
              });

              if (response.ok) {
                const buttonElement = e.target.querySelector('button');
                buttonElement.classList.add('animate-send');
                await new Promise(resolve => setTimeout(resolve, 800));
                alert('Message sent successfully!');
                e.target.reset();
                buttonElement.classList.remove('animate-send');
              } else {
                throw new Error('Failed to send message');
              }
            } catch (error) {
              alert('Failed to send message. Please try again.');
            }
          }} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-[0_0_10px_rgba(59,130,246,0.3)] relative z-10"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
