import Navbar from "../components/Navbar"
import { getServerSession } from "next-auth"
import { cookies } from "next/headers";
import TeamViewComponent from "./components/TeamComponent";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";
type SessionType = {
    user: {
        name: string
        email: string
        image: string
        id: string
    }
}
export default async function Team() {
    const session: SessionType | null = await getServerSession(options);
    const userId = session?.user?.id;
    if (!userId)
        redirect('/api/auth/signout')
    return (
        <div className="w-full flex items-center flex-col space-y-4">
            <Navbar name={session?.user?.name} image={session?.user?.image} />
            <TeamViewComponent userId={userId} />
        </div>
    )
}