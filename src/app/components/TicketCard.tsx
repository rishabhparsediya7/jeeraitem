import Image from "next/image"
import { TicketType } from "./ToDoColumn"
import { GripVertical, MessageCircle } from "lucide-react"
import Link from "next/link"
import EditModal from "./EditModal"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
interface TicketCardProps {
    email?: string | undefined | null
    ticket: TicketType,
    handleDragStart?: React.DragEventHandler<HTMLDivElement>
    teamId?: string
}
export const TicketCard = ({ ticket, handleDragStart, email, teamId }: TicketCardProps) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const toggleDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }
    const imagesArray = ["/avatar1.jpg", "/avatar2.jpg", "/avatar3.jpg"]
    return (
        <div className="draggable-item shadow-lg flex flex-col space-y-2" id={ticket.ticketId.toString()} draggable onDragStart={handleDragStart}>
            {showModal && <EditModal email={email} toggleModal={toggleModal} ticket={ticket} />}
            {showDeleteModal && <DeleteModal teamId={teamId} email={email} toggleModal={toggleDeleteModal} ticketId={ticket.ticketId} />}
            <div className="w-full flex justify-between">
                <div
                    className="bg-pink-200 flex justify-center items-center text-red-500 rounded-3xl px-3 py-0.5 w-fit font-bold tracking-wide">
                    <p className="m-auto text-[10px]">UI Design</p>
                </div>
                <div className="paste-button">
                    <button className="button">
                        <GripVertical />
                    </button>
                    <div className="dropdown-content">
                        <button onClick={() => toggleModal()} id="top">Edit</button>
                        <button onClick={() => toggleDeleteModal()} id="bottom">Delete</button>
                    </div>
                </div>
            </div>
            <div className="rounded-lg capitalize text-[14px] font-bold">{ticket.heading}</div>
            <div className="flex">
                {
                    imagesArray.map((image, index) => (
                        <img key={index} src={image} className={`h-8 w-8 ${index === 0 ? `` : `-ml-2`} rounded-full border border-gray-400`} alt="" />
                    ))
                }
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
    )
}