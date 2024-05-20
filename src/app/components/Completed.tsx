'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { TicketType } from "./ToDoColumn";
import { addTicket } from "../GlobalRedux/feature/TicketSlice";
import { TicketCard } from "./TicketCard";
import { Loader } from "./Loader";
export default function Completed({ email }: { email: string | undefined | null }) {
    const count = useSelector((state: RootState) => state.ticket.count)
    const [completedTickets, setCompletedTickets] = useState([])
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const updateTicket = async (itemId: string) => {
        const result = await fetch(`api/tickets/findById?email=${email}&ticketId=${itemId}`)
        const ticket = await result.json();
        console.log(ticket);
        const body = {
            email: email,
            ticketId: itemId,
            ticket: {
                heading: ticket.heading,
                content: ticket.content,
                tag: 'completed',
                ticketId: ticket.ticketId
            }
        }
        const response = await fetch(`/api/tickets`, {
            method: "PUT",
            body: JSON.stringify(body)
        })
        const data = await response.json()
    }
    const fetchTickets = async () => {
        const response = await fetch(`/api/tickets?email=${email}`);
        const data = await response.json();
        if (data.completed !== undefined)
            setCompletedTickets(data?.completed);
        setLoading(false)
    }
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
        fetchTickets()
    }, [count])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Completed</h1>
            {loading && <Loader />}                
            {completedTickets.length > 0 &&
                completedTickets.map((ticket: TicketType) => (
                    <TicketCard email={email} key={ticket.ticketId} ticket={ticket} />
                ))
            }
        </div>
    );
};