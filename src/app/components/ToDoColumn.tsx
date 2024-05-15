'use client'
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";

type TicketType = {
    id: number
    heading: string
    content: string
}

export default function ToDOColumn() {
    const tickets = useSelector((state: RootState) => state.ticket.tickets);
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', e.currentTarget.id);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const itemId = e.dataTransfer.getData('text/plain');
        const item = document.getElementById(itemId);
        if (item) {
            e.currentTarget.appendChild(item);
        }
    };
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Todos</h1>
            {
                tickets.map((ticket: TicketType) => (
                    <div key={ticket.id} className="draggable-item flex flex-col space-y-2" id={ticket.heading.toString().split(' ').join('_')} draggable onDragStart={handleDragStart}>
                        <div className="bg-pink-200 text-red-500 rounded-3xl px-2 py-1 w-fit text-[10px] font-bold tracking-wide">UI Design</div>
                        <div className="rounded-lg capitalize text-[14px] font-bold">{ticket.heading}</div>
                        <div className="flex">
                            <Image src="/avatar1.jpg" className="h-8 w-8 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                            <Image src="/avatar2.jpg" className="h-8 w-8 -ml-2 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                            <Image src="/avatar3.jpg" className="h-8 w-8 -ml-2 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                        </div>
                        <div>
                            <p className="text-[12px]">
                                {ticket.content}
                            </p>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <MessageCircle size={20} color="gray" />
                            <div className="text-[12px]">2 Comments</div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};