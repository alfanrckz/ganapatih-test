import React from 'react';

export const About: React.FC = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-gray-400 mb-4">
        2014 Yellow Taxi Trip Data
        </h1>
        <p className="text-gray-600 mb-4">
        These records are generated from the trip record submissions made by yellow taxi Technology Service Providers (TSPs). Each row represents a single trip in a yellow taxi. The trip records include fields capturing pick-up and drop-off dates/times, pick-up and drop-off taxi zone locations, trip distances, itemized fares, rate types, payment types, and driver-reported passenger counts.
        </p>
      </div>
    </div>
  );
};