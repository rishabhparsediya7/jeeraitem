import { formatTime } from "@/utils/dateFormat";
import { Notebook } from "lucide-react";
import { useEffect, useState } from "react"


export interface Team {
    _id: string;
    createdByUserId: string;
    name: string;
    workArray: [];
    teamArray: [];
    timestamp: Date
}

export const Teams = ({ teams }: { teams: Team[] }) => {

    return (
        <ul>
            {teams.length > 0 && teams.map((team: Team) => (
                <li key={team._id} className="flex mb-2 w-full">
                    <div className="bg-[#afd8af] p-2 rounded-md">
                        <Notebook color="white" />
                    </div>
                    <div className="flex justify-between items-center w-full px-2">
                        <div className="flex flex-col">
                            <h1 className="text-[14px] capitalize">
                                Team {team.name}
                            </h1>
                            <p className="text-[12px]">Members: {team.teamArray.length}</p>
                        </div>
                        <p className="text-[12px]">{formatTime(new Date(team.timestamp))}</p>
                    </div>
                </li>
            ))}
        </ul>)

}