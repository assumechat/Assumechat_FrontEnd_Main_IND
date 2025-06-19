'use client';
import { UserState } from '@/types/userstate';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/lib/logout';
import { logout } from '@/store/slices/userSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showFeatureMobile, setShowFeatureMobile] = useState(false);
    const [showHowItWorksMobile, setShowHowItWorksMobile] = useState(false);
    const [showAboutUsMobile, setShowAboutUsMobile] = useState(false);

    const user = useSelector((state: { user: UserState }) => state.user.user);
    const isAuthenticated = useSelector((state: { user: UserState }) => state.user.isAuthenticated);

  const router = useRouter();
  const dispatch = useDispatch();

    const isActive = (href: string) => pathname === href;

    const handleLogout = async () => {
        await logoutUser();
        dispatch(logout());
        router.push('/');
    };

    const featureItems = [
        { label: 'Mentorship', href: '/ComingSoon' },
        { label: 'Dating', href: '/ComingSoon' },
        { label: 'Notes', href: '/ComingSoon' },
        { label: 'Community', href: '/ComingSoon' },
        { label: 'Study Partner', href: '/ComingSoon' },
    ];

    const howItWorksItems = [
        { label: 'ComingSoon', href: '/ComingSoon' },
        /*
        { label: 'Matchmaking', href: '/ComingSoon' },
        { label: 'Video Call', href: '/ComingSoon' },
        { label: 'Feedback System', href: '/ComingSoon' },
        { label: 'Bug Report', href: '/ComingSoon' },
        */
    ];

    const aboutUsItems = [
        { label: 'Team', href: '/OurTeam' },
        { label: 'Careers', href: '/ComingSoon' },
        { label: 'Mission', href: '/ComingSoon' },
        { label: 'Contact', href: '/Request' },
        { label: 'Feedback', href: '/Request' },
        { label: 'Report Bug', href: '/Request' },
    ];

    return (
        <>
            <header className="w-full fixed px-4 md:px-20 py-4 flex items-center justify-between border-b border-gray-200 bg-opacity-30 backdrop-blur-[2px] z-50">
                <div className="text-2xl font-bold text-[#B30738]">
                    <Link href="/">BizzSocial</Link>
                </div>

                <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>

                <nav className="hidden md:flex font-medium space-x-14 text-md">
                    {!isAuthenticated && (
                        <>
                            {[
                                { label: 'How it works?', items: howItWorksItems },
                                { label: 'Features', items: featureItems },
                                { label: 'About Us', items: aboutUsItems },
                            ].map(({ label, items }) => (
                                <div key={label} className="relative group">
                                    <span className={`py-2 cursor-pointer ${pathname === '/ComingSoon' ? 'text-[#B30738] border-b-2 border-[#B30738]' : 'text-gray-700 hover:text-[#B30738]'} transition`}>
                                        {label}
                                    </span>
                                    <div className="absolute top-full left-0 w-48 mt-2 bg-white shadow-md border border-gray-100 rounded-lg hidden group-hover:block z-50">
                                        {items.map(({ label, href }) => (
                                            <Link key={label} href={href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#B30738]">
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link href="/waitingRoom" className={`py-2 ${isActive('/waitingRoom') ? 'text-[#B30738] border-b-2 border-[#B30738]' : 'text-gray-700 hover:text-[#B30738]'} transition`}>
                                Waiting Room
                            </Link>
                            <Link href="/ComingSoon" className={`py-2 ${isActive('/ComingSoon') ? 'text-[#B30738] border-b-2 border-[#B30738]' : 'text-gray-700 hover:text-[#B30738]'} transition`}>
                                Profile
                            </Link>
                        </>
                    )}
                </nav>

                <div className="hidden md:flex items-center space-x-3">
                    {isAuthenticated ? (
                        <Link
                            href="/signin"
                            onClick={handleLogout}
                            className={`px-6 md:px-12 py-2 border border-[#B30738] rounded-lg ${isActive('/signin') ? 'bg-gray-300 text-black' : 'bg-white text-[#B30738] hover:bg-gray-100'} transition`}
                        >
                            Log Out
                        </Link>
                    ) : (
                        <>
                            <Link href="/signin" className={`px-6 md:px-12 py-2 border border-[#B30738] rounded-lg ${isActive('/signin') ? 'bg-gray-300 text-black' : 'bg-white text-[#B30738] hover:bg-gray-100'} transition`}>
                                Sign In
                            </Link>
                            <Link href="/signup" className={`px-6 md:px-12 py-2 rounded-lg ${isActive('/signup') ? 'bg-red-800 text-white' : 'bg-[#B30738] text-white hover:bg-[#95052c]'} transition`}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {isMenuOpen && (
                <div className="fixed top-16 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-lg z-40 md:hidden border-b border-gray-200">
                    <nav className="flex flex-col p-4 space-y-4">
                        {!isAuthenticated && (
                            <>
                                {[{
                                    label: 'How it works?', show: showHowItWorksMobile, setShow: setShowHowItWorksMobile, items: howItWorksItems
                                }, {
                                    label: 'Features', show: showFeatureMobile, setShow: setShowFeatureMobile, items: featureItems
                                }, {
                                    label: 'About Us', show: showAboutUsMobile, setShow: setShowAboutUsMobile, items: aboutUsItems
                                }].map(({ label, show, setShow, items }) => (
                                    <div key={label}>
                                        <button
                                            onClick={() => setShow(!show)}
                                            className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:text-[#B30738]"
                                        >
                                            {label}
                                            <span>{show ? '-' : '+'}</span>
                                        </button>
                                        {show && (
                                            <div className="pl-6">
                                                {items.map(({ label, href }) => (
                                                    <Link
                                                        key={label}
                                                        href={href}
                                                        className="block py-1 text-sm text-gray-700 hover:text-[#B30738]"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}

                        {isAuthenticated && (
                            <>
                                <Link
                                    href="/waitingRoom"
                                    className={`py-2 px-4 ${isActive('/waitingRoom') ? 'text-[#B30738] font-bold' : 'text-gray-700 hover:text-[#B30738]'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Waiting Room
                                </Link>
                                <Link
                                    href="/ComingSoon"
                                    className={`py-2 px-4 ${isActive('/ComingSoon') ? 'text-[#B30738] font-bold' : 'text-gray-700 hover:text-[#B30738]'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                            </>
                        )}

                        <div className="flex flex-col space-y-3 pt-2">
                            {isAuthenticated ? (
                                <Link
                                    href="/"
                                    className={`px-6 py-2 border border-[#B30738] rounded-lg text-center ${isActive('/signin') ? 'bg-gray-300 text-black' : 'bg-white text-[#B30738] hover:bg-gray-100'}`}
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Log Out
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/signin"
                                        className={`px-6 py-2 border border-[#B30738] rounded-lg text-center ${isActive('/signin') ? 'bg-gray-300 text-black' : 'bg-white text-[#B30738] hover:bg-gray-100'}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className={`px-6 py-2 rounded-lg text-center ${isActive('/signup') ? 'bg-red-800 text-white' : 'bg-[#B30738] text-white hover:bg-[#95052c]'}`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
