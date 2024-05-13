'use client'
import React, { useState } from 'react';
import ToDOColumn from './components/ToDoColumn';
import InProgressColumn from './components/InProgressColumn';
import Completed from './components/Completed';
import Header from './components/Header';


const Home: React.FC = () => {
 
  return (
    <div className="w-full flex items-center flex-col space-y-4">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#eefbf5] w-full p-6">
        <ToDOColumn />
        <InProgressColumn />
        <Completed />
      </div>
    </div>
  );
};

export default Home;