import React from 'react';
import { Icons } from './Icons';

const Banner: React.FC = () => {
  return (
    <div className="mt-4 mb-24 relative rounded-xl overflow-hidden shadow-sm">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-200"></div>
      
      <div className="relative p-4 flex justify-between items-center">
        <div className="flex-1 z-10">
            <h3 className="text-purple-900 font-extrabold text-lg italic mb-1">Happy Holidays!</h3>
            <p className="text-purple-800 text-xs font-medium mb-3 max-w-[200px] leading-relaxed">
                Celebrate with joy and ease. <span className="font-bold">Our Loan Is Ready When You Need It</span>
            </p>
            <button className="bg-yellow-400 text-purple-900 text-xs font-bold py-2 px-6 rounded-full shadow-sm">
                Get Now!
            </button>
            
             {/* Pagination Dots Simulation */}
            <div className="flex space-x-1 mt-3">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                <div className="w-2 h-2 rounded-full bg-purple-300"></div>
            </div>
        </div>

        {/* Festive Illustrations */}
        <div className="absolute right-0 bottom-0 h-full w-1/2 flex items-end justify-end pointer-events-none">
             {/* Using pure CSS/Tailwind shapes for abstract representation or placeholder image */}
             <img 
                src="https://picsum.photos/200/150?random=1" 
                alt="Happy Holidays" 
                className="object-cover h-full w-full opacity-90 mask-image-gradient" 
                style={{maskImage: 'linear-gradient(to right, transparent, black)'}}
             />
        </div>
      </div>
    </div>
  );
};

export default Banner;
