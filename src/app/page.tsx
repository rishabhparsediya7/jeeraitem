import React, { useEffect } from 'react';
import ToDOColumn from './components/ToDoColumn';
import InProgressColumn from './components/InProgressColumn';
import Completed from './components/Completed';
import Header from './components/Header';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import Navbar from './components/Navbar';

export default async function Home() {
  const session = await getServerSession(options);
  
  return (
    <div className="w-full flex items-center flex-col space-y-4">
      <Navbar name={session?.user?.name} image={session?.user?.image} />
      <Header email={session?.user?.email} name={session?.user?.name} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#eefbf5] w-full p-6">
        <ToDOColumn email={session?.user?.email} />
        <InProgressColumn email={session?.user?.email} />
        <Completed email={session?.user?.email} />
      </div>
    </div>
  );
};
