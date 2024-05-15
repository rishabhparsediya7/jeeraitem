'use client'
import { Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CalendarWeek from "./CalendarComponent";
import Modal from "./Modal";
import { useState } from "react";
export default function Header() {
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
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-x-6 p-4">
            {showModal && <Modal toggleModal={toggleModal} />}
            <div className="bg-[#eefbf5] h-52 flex justify-between flex-col px-12 py-8 rounded-xl">
                <div className="">
                    <h1 className="text-[32px] font-bold">Sprint #</h1>
                    <h3 className="text-[20px] font-semibold">Team Next</h3>
                </div>
                <div className="flex">
                    <Image src="/avatar1.jpg" className="h-8 w-8 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                    <Image src="/avatar2.jpg" className="h-8 w-8 -ml-2 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                    <Image src="/avatar3.jpg" className="h-8 w-8 -ml-2 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                    <Image src="/avatar2.jpg" className="h-8 w-8 -ml-2 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                    <Image src="/avatar3.jpg" className="h-8 w-8 -ml-2 rounded-full border border-gray-400" alt="avatar" height={400} width={400} />
                </div>
            </div>
            <div className="bg-[#eefbf5] flex flex-col rounded-xl p-3 space-y-4">
                <div className="w-full flex space-x-2">
                    <button onClick={toggleModal} className="bg-[#f14e6b] w-full text-white rounded-lg px-2 py-1">New Assignment</button>
                    <button className="bg-[#f14e6b] w-full text-white rounded-md px-2 py-1">New Meeting</button>
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