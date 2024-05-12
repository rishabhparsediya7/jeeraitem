import { getWeek } from "@/utils/week";
import { MoveLeft, MoveRight } from "lucide-react";

export default function CalendarWeek() {
    const weeks = ['Mon', "Tues", "wed", 'thur', 'fri', 'sat', 'sun'];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const days = getWeek();
    const date = new Date();
    return <div className="w-full bg-[#eefbf5] px-6 py-4 rounded-xl flex flex-col space-y-4">
        <div className="flex justify-between ">
            <div>
                <h1 className="font-bold">{months[date.getMonth()]}, {date.getFullYear()}</h1>
            </div>
            <div className="flex space-x-4">
                <MoveLeft size={18} />
                <MoveRight size={18} />
            </div>
        </div>
        <div className="w-full flex">
            <table className="table-fixed w-full">
                <thead className="">
                    <tr className="">
                        {weeks.map((day) => (<th className="capitalize text-[10px] text-gray-500 font-bold">{day}</th>))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="">
                        {days.map((day) => (
                            <td className={`text-[10px] cursor-pointer text-center font-bold ${date.getDate() === day.getDate() ? `bg-[#f14e6b] rounded-full text-white p-2` : ``}`}>{day.getDate()}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}