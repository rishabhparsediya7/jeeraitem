'use client'
import CalendarWeek from "@/app/components/CalendarComponent";
import { useState } from "react";
import TeamModal from "@/app/components/TeamModal";
import { Teams, Team } from "@/app/components/Teams";
import Dropdown from "@/app/components/ui/dropdown";
import TeamTicketModal from "./TeamTicketModal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
export default function TeamHeader(
    {
        userId,
        teams
    }:
        {
            name?: string | undefined | null,
            userId?: string,
            teams: Team[]
        }) {
        
    const [showModal, setShowModal] = useState<boolean>(false);
    const teamId = useSelector((state: RootState) => state.team.id);
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const [showMeetModal, setShowMeetModal] = useState<boolean>(false);
    const toggleMeetModal = () => {
        setShowMeetModal(!showMeetModal)
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6 p-4">
            {showModal && <TeamTicketModal teamId={teamId} userId={userId} toggleModal={toggleModal} />}
            {showMeetModal && <TeamModal toggleModal={toggleMeetModal} userId={userId} />}
            <Dropdown teamId={teamId} userId={userId} />
            <div className="bg-[#eefbf5] flex flex-col rounded-xl p-3 space-y-4 max-h-52 no-scrollbar overflow-y-scroll">
                <div className="w-full flex space-x-2">
                    <button onClick={toggleModal} className="bg-[#f14e6b] w-full text-white rounded-lg px-2 py-1 text-[14px]">New Assignment</button>
                    <button onClick={() => toggleMeetModal()} className="bg-[#f14e6b] text-[14px] w-full text-white rounded-md px-2 py-1">Create Team</button>
                </div>
                <div className="w-full">
                    <Teams teams={teams} />
                </div>
            </div>
            <div>
                <CalendarWeek />
            </div>
        </div>
    )
}