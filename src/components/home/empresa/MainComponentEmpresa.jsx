import React from 'react';
import { motion } from 'framer-motion';

export const MainComponentEmpresa = () => {
  return (
    <div className="w-full relative overflow-hidden py-16 md:py-24">
      {/* Background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-pink-300 opacity-40 blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-purple-300 opacity-40 blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-indigo-300 opacity-40 blur-[120px]"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content: Text Section */}
        <div className="lg:w-1/2 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Inspire your <span className="text-pink-500">learning</span>, and theirs
          </h1>

          <div className="w-16 h-1 bg-pink-500"></div>

          <p className="text-lg text-gray-700 max-w-lg">
            Transform your classroom with online courses for teachers and students. 
            Upgrade your professional development and arm your students with workplace 
            skills, all in one place.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-md transition duration-200"
          >
            Enquire now
          </motion.button>
        </div>

        {/* Right Content: Illustration */}
        <div className="lg:w-1/2">
          <div className="relative">
            <img 
              src="https://www.bigsei.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fmbh68wssu2e0%2F1g9Nyu09LPM7gjG0mAfNGJ%2F6706725d0249ccccecd78203e803c7b9%2FTeaching_2x.png%3Ffm%3Dwebp%26q%3D60%26w%3D1312%26h%3D600&w=1080&q=75" 
              alt="Teacher presenting to students" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

 