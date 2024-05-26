'use client'
import { Plus } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
type bodyProps = {
    name: string;
    userId: string | undefined;
}
export default function TeamModal({ toggleModal, userId }: { toggleModal: () => void, userId?: string }) {
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const createTeam = async (body: bodyProps) => {
        const response = await fetch('/api/team', {
            method: 'post',
            body: JSON.stringify(body)
        })
        const data = await response.json();
        const res1 = await fetch('/api/user', {
            method: 'PUT',
            body: JSON.stringify({ userId: userId, teamId: data.teamId, inTeam: true })
        })
        const da = await res1.json();
        if (da) {
            router.push('/team')
        }
    }
    const create = () => {
        const body = {
            name: name,
            userId: userId
        }
        createTeam(body);
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
                        <label htmlFor="">Name of the Team</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border border-[#121212] text-gray-500 placeholder:text-gray-500 p-2 rounded-lg' placeholder='Team Name' />
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={() => create()} className='p-2 bg-[#121212] text-white rounded-lg w-40'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}