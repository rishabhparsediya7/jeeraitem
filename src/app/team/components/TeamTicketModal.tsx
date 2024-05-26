'use client'
import { addTicket } from "@/app/GlobalRedux/feature/TicketSlice";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
type bodyProps = {
    heading: string;
    content: string;
    tag: string;
    userId?: string;
    teamId?: string;
}
export default function TeamTicketModal({ toggleModal, teamId, userId }: { toggleModal: () => void, teamId?: string, userId?: string }) {
    const [heading, setHeading] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const dispatch = useDispatch();
    const save = async (body: bodyProps) => {
        const response = await fetch('/api/tickets/team', {
            method: 'POST',
            body: JSON.stringify(body)
        })
        const { success } = await response.json();
        if (success) {
            dispatch(addTicket())
        }
    }
    const saveTicket = () => {
        const body = {
            heading: heading, content: content, tag: 'todo', teamId: teamId, userId: userId
        }
        save(body);
        toggleModal();
    }
    return (
        <div className="w-[100vw] h-[100vh] bg-black/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className='w-full slide-in-right rounded-xl flex max-w-3xl flex-col space-y-2 bg-white modal-shadow  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className="flex justify-end p-4">
                    <Plus size={30} className="transform rotate-45 hover:bg-black/20 p-1 hover:cursor-pointer rounded-full" onClick={() => toggleModal()} />
                </div>
                <div className="px-[80px] flex flex-col space-y-2 pb-20">
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
        </div>
    )
}