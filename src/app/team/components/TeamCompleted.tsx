'use client'
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { usePathname } from "next/navigation";
import { RootState } from "@/app/GlobalRedux/store";
import { Loader } from "@/app/components/Loader";
import { TicketCard } from "@/app/components/TicketCard";
import { TicketType } from "./TeamTodoColumn";
export default function Completed({ email }: { email?: string | undefined | null }) {
    const teamId = useSelector((state: RootState) => state.team.id)
    const count = useSelector((state: RootState) => state.ticket.count)
    const [completedTickets, setCompletedTickets] = useState([])
    const [loading, setLoading] = useState(false);

    const updateTicket = async (ticketId: string) => {
        const result = await fetch(`api/tickets/team/findById?teamId=${teamId}&ticketId=${ticketId}`)
        const ticket = await result.json();
        const body = {
            teamId: teamId,
            ticketId: ticketId,
            ticket: {
                heading: ticket.heading,
                content: ticket.content,
                tag: 'completed',
                ticketId: ticket.ticketId
            }
        }
        const response = await fetch(`/api/tickets/team`, {
            method: "PUT",
            body: JSON.stringify(body)
        })
        const data = await response.json()
    }
    const fetchTeamTickets = async () => {
        const response = await fetch(`/api/tickets/team?teamId=${teamId}`);
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
        const ticketId = e.dataTransfer.getData('text/plain');
        const item = document.getElementById(ticketId);
        if (item) {
            e.currentTarget.appendChild(item);
            updateTicket(ticketId)
        }
    };
    useEffect(() => {
        setLoading(true)
        fetchTeamTickets()
    }, [count, teamId])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Completed</h1>
            {loading && <Loader />}
            {completedTickets.length > 0 &&
                completedTickets.map((ticket: TicketType) => (
                    <TicketCard teamId={teamId} email={email} key={ticket.ticketId} ticket={ticket} />
                ))
            }
        </div>
    );
};