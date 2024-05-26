'use client'
import { Suspense, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../GlobalRedux/store";
import { Team } from "../../components/Teams";
import { addTeam } from "../../GlobalRedux/feature/TeamSlice";
import TeamHeader from "./TeamHeader";
import ToDOColumn from "./TeamTodoColumn";
import InProgressColumn from "./TeamInProgressColumn";
import Completed from "./TeamCompleted";

export default function TeamViewComponent({ userId }: { userId: string | undefined }) {

    const dispatch = useDispatch();
    const [teamData, setTeamData] = useState<Team[]>([]);
    const teamId = useSelector((state: RootState) => state.team.id);
    const getTeamIds = async () => {
        const response = await fetch(`/api/team?userId=${userId}`);
        const { success, data } = await response.json();
        console.log(data);

        if (success) {
            setTeamData(data)
            if (data[0]?._id !== undefined)
                dispatch(addTeam(data[0]._id))
        }
    }
    useEffect(() => {
        getTeamIds()
    }, [])
    return (
        <Suspense fallback={<Loader />}>
            {teamData.length > 0 &&
                <TeamHeader teams={teamData} userId={userId} />
            }
            {teamData.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#eefbf5] w-full p-6">
                <ToDOColumn />
                <InProgressColumn />
                <Completed />
            </div>}
        </Suspense>
    )
}