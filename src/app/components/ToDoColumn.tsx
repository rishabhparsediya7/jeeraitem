'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { TicketCard } from "./TicketCard";
import { Loader } from "./Loader";
import { usePathname } from "next/navigation";

export type TicketType = {
    ticketId: number
    heading: string
    content: string
    tag: string
}

export default function ToDOColumn({ email, teamId }: { email?: string | undefined | null, teamId?: string }) {
    const pathname = usePathname();
    const [todoTickets, setTodoTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const count = useSelector((state: RootState) => state.ticket.count)
    const fetchTeamTickets = async () => {
        const response = await fetch(`/api/tickets/team?teamId=${teamId}`);
        const data = await response.json();
        if (data.todo !== undefined)
            setTodoTickets(data?.todo);
        setLoading(false)
    }
    const fetchTickets = async () => {
        const response = await fetch(`/api/tickets?email=${email}`);
        const data = await response.json();
        if (data.todo !== undefined)
            setTodoTickets(data?.todo);
        setLoading(false)
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
        setLoading(true)
        if (teamId !== undefined && pathname === '/team') {
            fetchTeamTickets()
        }
        else if (email !== undefined && pathname === '/') {
            fetchTickets()
        }
    }, [count])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Todos</h1>
            {loading && <Loader />}
            {todoTickets.length > 0 &&
                todoTickets.map((ticket: TicketType) => (
                    <TicketCard email={email} key={ticket.ticketId} ticket={ticket} handleDragStart={handleDragStart} />
                ))
            }
        </div>
    );
};