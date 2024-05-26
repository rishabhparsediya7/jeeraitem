'use client'
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { TicketCard } from "@/app/components/TicketCard";
import { Loader } from "@/app/components/Loader";
import { Ticket } from "lucide-react";
import { addTicket } from "@/app/GlobalRedux/feature/TicketSlice";

export type TicketType = {
    ticketId: number
    heading: string
    content: string
    tag: string
    timeStamp: Date
}

export default function ToDOColumn() {
    const dispatch=useDispatch();
    const teamId = useSelector((state: RootState) => state.team.id)
    const [todoTickets, setTodoTickets] = useState<TicketType[]>([]);
    const [loading, setLoading] = useState(false);
    const count = useSelector((state: RootState) => state.ticket.count)
    const fetchTeamTickets = async (teamId: string) => {
        const response = await fetch(`/api/tickets/team?teamId=${teamId}`);
        const data = await response.json();
        if (data.todo !== undefined)
            setTodoTickets(data?.todo)
        else setTodoTickets([])
        setLoading(false)
    }
    const updateTicket = async (itemId: string) => {
        const response = await fetch(`/api/tickets/team`, {
            method: "PUT",
            body: JSON.stringify({ itemId, tagTo: "todo" })
        })
        const data = await response.json()
        if(data)
            dispatch(addTicket())
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
        fetchTeamTickets(teamId)
    }, [count, teamId])
    return (
        <div className="drag-and-drop" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1>Todos</h1>
            {loading && <Loader />}
            {todoTickets.length > 0 ?
                todoTickets.map((ticket: TicketType) => (
                    <TicketCard teamId={teamId} key={ticket.ticketId} ticket={ticket} handleDragStart={handleDragStart} />
                )) : <></>
            }
        </div>
    );
};