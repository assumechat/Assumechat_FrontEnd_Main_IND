"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // helper to check active link
    const isActive = (href: string) => pathname === href;

    return (
        <>
            <header className="w-full fixed px-4 md:px-20 py-4 flex items-center justify-between bg-opacity-30 backdrop-blur-[2px] z-50">
                {/* Logo */}
                <div className="flex flex-col">
                    <div className="text-2xl font-bold text-[#B30738]">
                        <Link href="/">BizzSocial</Link>
                    </div>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        Made In
                        <img
                            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                            alt="India Flag"
                            style={{ width: '18px', height: '12px', display: 'inline', verticalAlign: 'middle' }}
                        />
                        For INDIA
                    </span>
                </div>

            </header>
        </>
    );
}
