'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { TicketCard } from "./TicketCard";
import { Loader } from "./Loader";

export type TicketType = {
    ticketId: number
    heading: string
    content: string
    tag: string
}

export default function ToDOColumn({ email }: { email: string | undefined | null }) {
    const [todoTickets, setTodoTickets] = useState([]);
    const count = useSelector((state: RootState) => state.ticket.count)
    const fetchTickets = async () => {
        const response = await fetch(`/api/tickets?email=${email}`);
        const data = await response.json();
        if (data.todo !== undefined)
            setTodoTickets(data?.todo);
    }
    const updateTicket = async (itemId: string) => {
        const response = await fetch(`/api/tickets`, {
            method: "PUT",
            body: JSON.stringify({ email, itemId, tagTo: "todo" })
        })
        const data = await response.json()
    }

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
            updateTicket(itemId)
        }
    };
    useEffect(() => {
        fetchTickets()
    }, [count])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Todos</h1>
            <Suspense fallback={<Loader />}>
                {todoTickets.length > 0 &&
                    todoTickets.map((ticket: TicketType) => (
                        <TicketCard email={email} key={ticket.ticketId} ticket={ticket} handleDragStart={handleDragStart} />
                    ))
                }
            </Suspense>
        </div>
    );
};