'use client'
import React, { useState } from 'react';
import ToDOColumn from './components/ToDoColumn';
import InProgressColumn from './components/InProgressColumn';
import Completed from './components/Completed';
import Image from 'next/image';
import Header from './components/Header';

type TicketType = {
  heading: string
  content: string
}

const Home: React.FC = () => {

  const [heading, setHeading] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const saveTicket = () => {
    const ticket: TicketType[] = [...tickets];
    ticket.push({ heading, content });
    setTickets(ticket);
  }
  return (
    <div className="w-full flex items-center flex-col space-y-4">
      <Header />
      <div className="grid grid-cols-3 gap-2 bg-[#eefbf5] w-full p-6">
        <ToDOColumn tickets={tickets} />
        <InProgressColumn />
        <Completed />
      </div>
    </div>
  );
};

export default Home;

/*
 <div className='w-full flex flex-col sm:flex-row p-4'>
        <div>
          
        </div>
        <div className='w-full flex flex-col max-w-3xl p-2 space-y-2'>
          <div className='w-full flex flex-col'>
            <label htmlFor="">Heading</label>
            <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} className='border border-[#121212] text-gray-500 placeholder:text-gray-500 p-2 rounded-lg' placeholder='Enter the heading' />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor="content">Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className='border border-[#121212] text-gray-500 placeholder:text-gray-500 p-2 rounded-lg' name="content" id="content"></textarea>
          </div>
          <div className='flex justify-end'>
            <button onClick={() => saveTicket()} className='p-2 bg-[#121212] text-white rounded-lg w-40'>Submit</button>
          </div>
        </div>
      </div>
      */