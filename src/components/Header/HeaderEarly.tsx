"use client";
import { UserState } from "@/types/userstate";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/lib/logout";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const user = useSelector((state: { user: UserState }) => state.user.user);
    const isAuthenticated = useSelector(
        (state: { user: UserState }) => state.user.isAuthenticated
    );

    const router = useRouter();
    const dispatch = useDispatch();

    const isInWaitingRoom = pathname === "/waitingRoom";

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push("/");
    };

    const featureLine = [
        { label: "Notes", href: "/ComingSoon" },
        { label: "Community", href: "/ComingSoon" },
        { label: "Random Chat", href: "/ComingSoon" },
        { label: "Study Partner ❤️", href: "/ComingSoon" },
    ];

    return (
        <>
            <header className="w-full fixed top-0 left-0 px-4 lg:px-20 py-4 flex items-center justify-between border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-[2px] z-50">
                <Logo />

                {/* Desktop Nav */}
                <nav className="hidden md:flex flex-1 justify-center space-x-8 text-gray-800 font-medium">
                    {featureLine.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`transition text-lg ${item.label.includes("❤️")
                                ? "text-pink-600 font-semibold"
                                : "hover:text-blue-600"
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden fixed top-16 left-0 w-full bg-white bg-opacity-90 backdrop-blur-sm z-40 px-6 py-4 space-y-4 shadow-md">
                    {featureLine.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`block text-base font-medium ${item.label.includes("❤️")
                                ? "text-pink-600 font-semibold"
                                : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </>
    );
}
