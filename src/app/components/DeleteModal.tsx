'use client'
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

type bodyProps = {
    ticketId: number
    teamId?: string
    email?: string | undefined | null
}
export default function DeleteModal({ toggleModal, email, ticketId, teamId }: { toggleModal: () => void, email: string | undefined | null, ticketId: number, teamId?: string }) {
    const pathname = usePathname();
    const deleteT = async (body: bodyProps, url: string) => {
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(body)
        })
        const data = await response.json();
        if (data) {
            window.location.reload()
        }
    }
    const deleteTicket = async () => {
        let body, url: string;
        if (pathname === '/team') {
            body = {
                teamId: teamId,
                ticketId: ticketId
            }
            url = '/api/tickets/team'
        }
        else {
            body = {
                email: email,
                ticketId: ticketId
            }
            url = '/api/tickets'
        }
        deleteT(body, url);
        toggleModal();
    }
    return (
        <div className="w-[100vw] z-10 h-[100%] bg-black/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className='w-full rounded-xl flex max-w-96 flex-col space-y-4 bg-white modal-shadow  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4'>
                <h1 className="text-gray-700">Are you sure you want to delete ?</h1>
                <div className="w-full flex justify-between space-x-2">
                    <button onClick={() => toggleModal()} className="bg-[#f14e6b] text-white flex-1 rounded-lg p-2">Cancel</button>
                    <button onClick={() => deleteTicket()} className="border border-[#f14e6b] text-[#f14e6b] hover:bg-[#f14e6b] hover:text-white flex-1 rounded-lg p-2">Delete</button>
                </div>
            </div>
        </div>
    )
}