import React from 'react';
import { Button } from '../ui/button';

const SermonCard = ({ sermon }) => {
  const handleListenNow = (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    window.location.href = sermon.link; // Direct navigation
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
      <div className="relative flex-shrink-0">
        <img 
          src={sermon.img} 
          alt={sermon.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <span className="text-sm">{sermon.category}</span>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{sermon.title}</h3>
        <div className="mt-auto space-y-1">
          <p className="text-gray-600 text-sm">Preacher: {sermon.preacher}</p>
          <p className="text-gray-600 text-sm">Duration: {sermon.duration}</p>
          <p className="text-gray-600 text-sm mb-3">Date: {sermon.date}</p>
          <p className="text-gray-600 text-sm mb-3">Refrence: {sermon.bibleReferences}</p>
          <Button 
            className="w-full  text-white"
            onClick={handleListenNow}
          >
            Listen Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SermonCard;