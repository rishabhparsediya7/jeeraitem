'use client'

import { Plus } from "lucide-react"

export default function InfoModal({ toggleModal }: { toggleModal: () => void }) {
    return (
        <div className="w-[100vw] z-10 h-[100%] bg-black/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className='w-full rounded-xl flex justify-center items-center max-w-96 flex-col space-y-4 bg-white modal-shadow  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4'>
                <div className="w-full flex justify-end">
                    <Plus size={30} className="transform rotate-45 hover:bg-black/20 p-1 hover:cursor-pointer rounded-full" onClick={() => toggleModal()} />
                </div>
                <img className="rounded-xl" src="/bob-the-builder.gif" alt="bob" />
                <button onClick={() => toggleModal()} className="bg-[#f14e6b] w-full rounded-xl p-2 text-white font-bold tracking-wider">Yes, You can!</button>
            </div>
        </div>
    )
}