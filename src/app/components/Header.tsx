'use client'
import CalendarWeek from "./CalendarComponent";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import TeamModal from "./TeamModal";
import { Team, Teams } from "./Teams";

export default function Header(
    { email, name, userId }:
        { email: string | undefined | null, name?: string | undefined | null, userId?: string, teamId?: string }) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [teamData, setTeamData] = useState<Team[]>([])
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const getTeamIds = async () => {
        const response = await fetch(`/api/team?userId=${userId}`);
        const { success, data } = await response.json();
        if (success) {
            setTeamData(data)
        }
    }
    const [showMeetModal, setShowMeetModal] = useState<boolean>(false);
    const toggleMeetModal = () => {
        setShowMeetModal(!showMeetModal)
    }
    const imagesArray = ['/avatar1.jpg', '/avatar2.jpg', '/avatar2.jpg', '/avatar3.jpg', '/avatar3.jpg']
    useEffect(() => {
        getTeamIds();
    }, [])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6 p-4">
            {showModal && <Modal userId={userId} email={email} toggleModal={toggleModal} />}
            {showMeetModal && <TeamModal toggleModal={toggleMeetModal} userId={userId} />}
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
            <div className="bg-[#eefbf5] flex flex-col rounded-xl p-3 space-y-4 max-h-52 ">
                <div className="w-full flex space-x-2">
                    <button onClick={toggleModal} className="bg-[#f14e6b] w-full text-white rounded-lg px-2 py-1 text-[14px]">New Assignment</button>
                    <button onClick={() => toggleMeetModal()} className="bg-[#f14e6b] text-[14px] w-full text-white rounded-md px-2 py-1">Create Team</button>
                </div>
                <div className="w-full no-scrollbar overflow-y-scroll">
                    <Teams teams={teamData} />
                </div>
            </div>
            <div>
                <CalendarWeek />
            </div>
        </div>
    )
}