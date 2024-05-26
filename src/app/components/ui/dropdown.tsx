import React, { useEffect, useState } from 'react';
import { Team } from '../Teams';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam } from '@/app/GlobalRedux/feature/TeamSlice';
import { RootState } from '@/app/GlobalRedux/store';
const Dropdown = ({ userId, teamId }: { userId?: string, teamId?: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const dispatch = useDispatch();
    const fetchUserTeams = async () => {
        const response = await fetch(`/api/team?userId=${userId}&teamId=${teamId}`);
        const { success, data } = await response.json()
        if (success)
            setTeams(data)
    }
    useEffect(() => {
        fetchUserTeams()
    }, [])
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const teamName = teams.find((team) => team._id === teamId)?.name;

    return (
        <div className="relative flex text-left w-full bg-[#eefbf5] rounded-xl p-4" onClick={() => { if (isOpen) setIsOpen(false) }}>
            <div className='flex-1'>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={toggleDropdown}
                >
                    Team
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className='flex-1 flex py-2 justify-center'>
                {teams.length > 0 && <h1>Team, {teamName}</h1>}
            </div>
            {isOpen && (
                <div
                    className="origin-top-right absolute left-4 mt-10 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {
                            teams.map((team: Team) => (
                                <button
                                    onClick={() => dispatch(addTeam(team._id))}
                                    key={team._id}
                                    className="text-gray-700 capitalize block px-4 py-2 text-sm hover:bg-gray-100"
                                    role="menuitem"
                                    tabIndex={-1}
                                    id="menu-item-0"
                                >
                                    Team, {team.name}
                                </button>
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
