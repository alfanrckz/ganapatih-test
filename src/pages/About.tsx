import React from 'react';
import { MainLayout } from '../templates/layouts/MainLayout';

export const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
        <p className="text-gray-600 mb-4">
          We are a modern web application built with the latest technologies and best practices.
          Our stack includes React, TypeScript, and follows the Atomic Design pattern.
        </p>
      </div>
    </MainLayout>
  );
};