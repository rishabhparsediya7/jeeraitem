'use client'
import React, { Suspense, useEffect, useState } from "react";
import { TicketType } from "./ToDoColumn";
import { useDispatch, useSelector } from "react-redux";
import { addTicket } from "../GlobalRedux/feature/TicketSlice";
import { RootState } from "../GlobalRedux/store";
import { TicketCard } from "./TicketCard";
import { Loader } from "./Loader";
import { usePathname } from "next/navigation";

export default function InProgressColumn({ email, teamId }: { email?: string | undefined | null, teamId?: string }) {
    const pathname = usePathname()
    const count = useSelector((state: RootState) => state.ticket.count)
    const [inProgressTickets, setInProgresstickets] = useState([])
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const updateTicket = async (itemId: string) => {
        const result = await fetch(`api/tickets/findById?email=${email}&ticketId=${itemId}`)
        const ticket = await result.json();
        const body = {
            email: email,
            ticketId: itemId,
            ticket: {
                heading: ticket.heading,
                content: ticket.content,
                tag: 'inprogress',
                ticketId: ticket.ticketId
            }
        }
        await fetch(`/api/tickets`, {
            method: "PUT",
            body: JSON.stringify(body)
        })
    }
    const fetchTeamTickets = async () => {
        const response = await fetch(`/api/tickets/team?teamId=${teamId}`);
        const data = await response.json();
        if (data.inprogress !== undefined) {
            setInProgresstickets(data?.inprogress);
        }
        setLoading(false)
    }
    const fetchTickets = async () => {
        const response = await fetch(`/api/tickets?email=${email}`);
        const data = await response.json();
        if (data.inprogress !== undefined) {
            setInProgresstickets(data?.inprogress);
        }
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
            dispatch(addTicket())
        }
    };
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', e.currentTarget.id);
        e.dataTransfer.effectAllowed = 'move';
    };
    useEffect(() => {
        setLoading(true)
        if (teamId !== undefined && pathname === '/team') {
            fetchTeamTickets()
        }
        else {
            fetchTickets()
        }
    }, [count])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>In Progress</h1>
            {loading && <Loader />}
            {inProgressTickets.length > 0 &&
                inProgressTickets.map((ticket: TicketType) => (
                    <TicketCard email={email} key={ticket.ticketId} ticket={ticket} handleDragStart={handleDragStart} />
                ))
            }
        </div>
    );
};