'use client'
import { Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CalendarWeek from "./CalendarComponent";
import Modal from "./Modal";
import { useState } from "react";
import InfoModal from "./InfoModal";
export default function Header({ email, name }: { email: string | undefined | null, name: string | undefined | null }) {
    const meetins = [
        {
            title: "One on one",
            time: "12:00 PM",
        },
        {
            title: "Retro Meetup",
            time: "02:00 PM",
        },
        {
            title: "Standup call",
            time: "03:30 PM",
        },
    ]
    const [showModal, setShowModal] = useState<boolean>(false);
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
    const toggleInfoModal = () => {
        setShowInfoModal(!showInfoModal)
    }
    const imagesArray = ['/avatar1.jpg', '/avatar2.jpg', '/avatar2.jpg', '/avatar3.jpg', '/avatar3.jpg']
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6 p-4">
            {showModal && <Modal email={email} toggleModal={toggleModal} />}
            {showInfoModal && <InfoModal toggleModal={toggleInfoModal} />}
            <div className="bg-[#eefbf5] h-52 flex justify-between flex-col px-12 py-8 rounded-xl">
                <div className="">
                    <h1 className="text-[32px] font-bold">Sprint #</h1>
                    <h3 className="text-[20px] font-semibold capitalize">{name}</h3>
                </div>
                <div className="flex">
                    {
                        imagesArray.map((images, index) => (
                            <img key={index} src={images} className={`h-8 w-8 ${index === 0 ? `` : `-ml-2`} rounded-full border border-gray-400`} alt="imgs" />
                        ))
                    }
                </div>
            </div>
            <div className="bg-[#eefbf5] flex flex-col rounded-xl p-3 space-y-4">
                <div className="w-full flex space-x-2">
                    <button onClick={toggleModal} className="bg-[#f14e6b] w-full text-white rounded-lg px-2 py-1 text-[14px]">New Assignment</button>
                    <button onClick={() => toggleInfoModal()} className="bg-[#f14e6b] text-[14px] w-full text-white rounded-md px-2 py-1">New Meeting</button>
                </div>
                <div className="w-full">
                    <ul>
                        {meetins.map((meet) => (
                            <li key={meet.title} className="flex mb-2 w-full">
                                <div className="bg-[#afd8af] p-2 rounded-md">
                                    <Notebook color="white" />
                                </div>
                                <div className="flex justify-between items-center w-full px-2">
                                    <div className="flex flex-col">
                                        <h1 className="text-[14px]">
                                            {meet.title}
                                        </h1>
                                        <Link href="https://meet.example.com" className="text-[10px] text-blue-600">
                                            Link - https://meet.example.com
                                        </Link>
                                    </div>
                                    <p className="text-[12px]">{meet.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <CalendarWeek />
            </div>
        </div>
    )
}