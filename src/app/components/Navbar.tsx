'use client'
import { Bell, LucideAlignJustify } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ name, image }: { name: string | undefined | null, image: string | undefined | null }) {
    const [showNav, setShowNav] = useState(false)
    return (
        <nav className="w-full flex flex-col items-center bg-white ">
            <div className="flex justify-between w-full p-4 shadow-lg">
                <div className="text-[16px] flex items-center">
                    <img className="h-12 w-20 rounded-3xl" src="/camel.jpg" alt="" />
                    <span className="mx-3 text-[20px] font-bold uppercase">Jeera Board</span>
                </div>
                <div className="hidden sm:flex items-center">
                    <ul className="flex items-center space-x-2">
                        <Link href="/" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Home</Link>
                        <Link href="/team" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Team</Link>
                        {name && <button onClick={() => signOut()} className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Signout</button>}
                        <Link href="/" className="hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">
                            <Bell />
                        </Link>
                        <li>Hi, <span className="capitalize">{name?.toString().split(" ")[0]}</span></li>
                        <li>
                            <img className="h-10 w-10 rounded-full" src={image ? image : `/user.jpg`} alt="default_user" />
                        </li>
                    </ul>
                </div>
                <div className="sm:hidden flex justify-center items-center">
                    <LucideAlignJustify onClick={() => setShowNav(!showNav)} className="cursor-pointer" />
                </div>
            </div>
            {showNav && <div className="flex w-full bg-white shadow-lg sm:hidden items-center p-4">
                <ul className="flex flex-col items-center space-x-2 justify-start text-left">
                    <Link href="/home" className="w-full hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Home</Link>
                    <Link href="/team" className="w-full hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Teams</Link>
                    {name && <button onClick={() => signOut()} className="w-full hover:bg-[#f14e6b] tracking-wide hover:text-white rounded-md p-2">Signout</button>}
                    <Link href="/notification" className="hover:bg-[#f14e6b] w-full tracking-wide hover:text-white rounded-md p-2">
                        <Bell />
                    </Link>
                    <li className="p-2 flex items-center justify-start space-x-4">Hi, <span className="capitalize">{name?.toString().split(" ")[0]}</span>
                        <Image className="h-10 w-10 rounded-full" src={image ? image : `/user.jpg`} alt="default_user" height={500} width={500} />
                    </li>
                </ul>
            </div>}
        </nav>
    )
}