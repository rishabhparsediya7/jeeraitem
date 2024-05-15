import { Bell, HamIcon, LucideAlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ name, image }: { name: string | undefined | null, image: string | undefined | null }) {
    return (
        <nav className="w-full flex justify-between p-4 items-center bg-white shadow-lg">
            <div className="text-[16px] flex items-center">
                <Image
                    className="h-12 w-20 rounded-3xl"
                    src="/camel.jpg"
                    alt="camel"
                    height={500}
                    width={500}
                />
                <span className="mx-3 text-[20px] font-bold uppercase">Jeera Board</span>
            </div>
            <div className="flex items-center">
                <ul className="flex items-center space-x-2">
                    <Link href="/home" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Home</Link>
                    <Link href="/profile" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Profile</Link>
                    {name && <Link href="/api/auth/signout" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Signout</Link>}
                    <Link href="/notification" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">
                        <Bell />
                    </Link>
                    <li>
                        <Image className="h-10 w-10 rounded-full" src={`${image ? image : `/user.jpg`}`} alt="default_user" height={500} width={500} />
                    </li>
                </ul>
            </div>
        </nav>
    )
}