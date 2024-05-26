'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { TicketCard } from "@/app/components/TicketCard";
import { Loader } from "@/app/components/Loader";
import { addTicket } from "@/app/GlobalRedux/feature/TicketSlice";
import { TicketType } from "./TeamTodoColumn";

export default function InProgressColumn() {
    const teamId = useSelector((state: RootState) => state.team.id)
    const count = useSelector((state: RootState) => state.ticket.count)
    const [inProgressTickets, setInProgresstickets] = useState<TicketType[]>([])
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const updateTicket = async (ticketId: string) => {
        const result = await fetch(`api/tickets/team/findById?teamId=${teamId}&ticketId=${ticketId}`)
        const ticket = await result.json();
        const body = {
            teamId: teamId,
            ticketId: ticketId,
            ticket: {
                heading: ticket.heading,
                content: ticket.content,
                tag: 'inprogress',
                ticketId: ticket.ticketId
            }
        }
        await fetch(`/api/tickets/team`, {
            method: "PUT",
            body: JSON.stringify(body)
        })
    }
    const fetchTeamTickets = async () => {
        const response = await fetch(`/api/tickets/team?teamId=${teamId}`);
        const data = await response.json();
        if (data.inprogress !== undefined) {
            setInProgresstickets(data.inprogress);
        } else {
            setInProgresstickets([])
        }
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
            dispatch(addTicket())
        }
    };
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', e.currentTarget.id);
        e.dataTransfer.effectAllowed = 'move';
    };
    useEffect(() => {
        setLoading(true)
        fetchTeamTickets()
    }, [count, teamId])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>In Progress</h1>
            {loading && <Loader />}
            {inProgressTickets.length > 0 &&
                inProgressTickets.map((ticket: TicketType) => (
                    <TicketCard teamId={teamId} email={""} key={ticket.ticketId} ticket={ticket} handleDragStart={handleDragStart} />
                ))
            }
        </div>
    );
};