"use client";
import { UserState } from "@/types/userstate";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/lib/logout";
import { logout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFeatureMobile, setShowFeatureMobile] = useState(false);
  const [showHowItWorksMobile, setShowHowItWorksMobile] = useState(false);
  const [showAboutUsMobile, setShowAboutUsMobile] = useState(false);

  const user = useSelector((state: { user: UserState }) => state.user.user);
  const isAuthenticated = useSelector(
    (state: { user: UserState }) => state.user.isAuthenticated
  );

  const router = useRouter();
  const dispatch = useDispatch();

  const isActive = (href: string) => pathname === href;

  // Check if user is currently in waiting room
  const isInWaitingRoom = pathname === "/waitingRoom";

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    router.push("/");
  };

  const handleExplore = () => {
    if (isAuthenticated) {
      router.push("/waitingRoom");
    } else {
      router.push("/signin");
    }
  };

  const featureItems = [
    { label: "Mentorship", href: "/ComingSoon" },
    { label: "Dating", href: "/ComingSoon" },
    { label: "Notes", href: "/ComingSoon" },
    { label: "Community", href: "/ComingSoon" },
    { label: "Study Partner", href: "/ComingSoon" },
  ];

  const howItWorksItems = [
    { label: "ComingSoon", href: "/ComingSoon" },
    /*
        { label: 'Matchmaking', href: '/ComingSoon' },
        { label: 'Video Call', href: '/ComingSoon' },
        { label: 'Feedback System', href: '/ComingSoon' },
        { label: 'Bug Report', href: '/ComingSoon' },
        */
  ];

  const aboutUsItems = [
    { label: "Team", href: "/OurTeam" },
    { label: "Careers", href: "/ComingSoon" },
    { label: "Mission", href: "/ComingSoon" },
    { label: "Contact", href: "/Request" },
    { label: "Feedback", href: "/Request" },
    { label: "Report Bug", href: "/Request" },
  ];

  return (
    <>
      <header className="w-full fixed px-4 lg:px-20 py-4 flex items-center justify-between border-b border-gray-200 bg-white bg-opacity-30 backdrop-blur-[2px] z-50">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-[#B30738]">
            <Link href="/">BizzSocial</Link>
          </div>
          <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
            Made In
            <img
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="India Flag"
              style={{
                width: "18px",
                height: "12px",
                display: "inline",
                verticalAlign: "middle",
              }}
            />
            For INDIA
          </span>
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className="hidden md:flex font-medium space-x-14 text-md">
          {!isAuthenticated && (
            <>
              {[
                { label: "How it works?", items: howItWorksItems },
                { label: "Features", items: featureItems },
                { label: "About Us", items: aboutUsItems },
              ].map(({ label, items }) => (
                <div key={label} className="relative group">
                  <span
                    className={`py-2 cursor-pointer ${
                      pathname === "/ComingSoon"
                        ? "text-[#B30738] border-b-2 border-[#B30738]"
                        : "text-gray-700 hover:text-[#B30738]"
                    } transition`}
                  >
                    {label}
                  </span>
                  <div className="absolute top-full left-0 w-48 mt-2 bg-white shadow-md border border-gray-100 rounded-lg hidden group-hover:block z-50">
                    {items.map(({ label, href }) => (
                      <Link
                        key={label}
                        href={href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#B30738]"
                      >
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
              <Link
                href="/ComingSoon"
                className={`py-2 ${
                  isActive("/Mentorship")
                    ? "text-[#B30738] border-b-2 border-[#B30738]"
                    : "text-gray-700 hover:text-[#B30738]"
                } transition`}
              >
                Mentorship
              </Link>
              <Link
                href="/ComingSoon"
                className={`py-2 ${
                  isActive("/StudyPartner")
                    ? "text-[#B30738] border-b-2 border-[#B30738]"
                    : "text-gray-700 hover:text-[#B30738]"
                } transition`}
              >
                Study Partner 💗
              </Link>

              <Link
                href="/ComingSoon"
                className={`py-2 ${
                  isActive("/Notes")
                    ? "text-[#B30738] border-b-2 border-[#B30738]"
                    : "text-gray-700 hover:text-[#B30738]"
                } transition`}
              >
                Notes
              </Link>
              <Link
                href="/ComingSoon"
                className={`py-2 ${
                  isActive("/Community")
                    ? "text-[#B30738] border-b-2 border-[#B30738]"
                    : "text-gray-700 hover:text-[#B30738]"
                } transition`}
              >
                Community
              </Link>
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 lg:gap-8">
              {!isInWaitingRoom && (
                <button
                  onClick={handleExplore}
                  className="px-6 md:px-12 py-2 rounded-lg bg-[#B30738] text-white hover:bg-[#95052c] transition"
                >
                  Explore
                </button>
              )}

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0">
                    {user ? (
                      //  <img     src={'http://cloudinary link '} alt="Profile" className="h-full w-full object-cover" />
                      <User className="h-4 w-4 text-gray-600 m-auto mt-2" />
                    ) : (
                      <User className="h-4 w-4 text-gray-600 m-auto mt-2" />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Link className="w-full" href={"/ComingSoon"}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Link className="w-full" href={"/"}>
                      Log Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <button
              onClick={handleExplore}
              className="px-6 md:px-12 py-2 rounded-lg bg-[#B30738] text-white hover:bg-[#95052c] transition"
            >
              Explore
            </button>
          )}
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-lg z-40 md:hidden border-b border-gray-200">
          <nav className="flex flex-col p-4 space-y-4">
            {!isAuthenticated && (
              <>
                {[
                  {
                    label: "How it works?",
                    show: showHowItWorksMobile,
                    setShow: setShowHowItWorksMobile,
                    items: howItWorksItems,
                  },
                  {
                    label: "Features",
                    show: showFeatureMobile,
                    setShow: setShowFeatureMobile,
                    items: featureItems,
                  },
                  {
                    label: "About Us",
                    show: showAboutUsMobile,
                    setShow: setShowAboutUsMobile,
                    items: aboutUsItems,
                  },
                ].map(({ label, show, setShow, items }) => (
                  <div key={label}>
                    <button
                      onClick={() => setShow(!show)}
                      className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 hover:text-[#B30738]"
                    >
                      {label}
                      <span>{show ? "-" : "+"}</span>
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
                  href="/ComingSoon"
                  className={`py-2 px-4 ${
                    isActive("/Mentorship")
                      ? "text-[#B30738] font-bold"
                      : "text-gray-700 hover:text-[#B30738]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mentorship
                </Link>
                <Link
                  href="/ComingSoon"
                  className={`py-2 px-4 ${
                    isActive("/StudyPartner")
                      ? "text-[#B30738] font-bold"
                      : "text-gray-700 hover:text-[#B30738]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Study Partner 💗
                </Link>
                <Link
                  href="/ComingSoon"
                  className={`py-2 px-4 ${
                    isActive("/Notes")
                      ? "text-[#B30738] font-bold"
                      : "text-gray-700 hover:text-[#B30738]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Notes
                </Link>
                <Link
                  href="/ComingSoon"
                  className={`py-2 px-4 ${
                    isActive("/Commnity")
                      ? "text-[#B30738] font-bold"
                      : "text-gray-700 hover:text-[#B30738]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community
                </Link>

                {/* Mobile Profile Section */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                      {user ? (
                        //<img src={user.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                        <User className="h-4 w-4 text-gray-600 m-auto mt-2" />
                      ) : (
                        <FiUser className="h-4 w-4 text-gray-600 m-auto mt-2" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {user?.name || "User"}
                    </span>
                  </div>
                  <Link
                    href="/ComingSoon"
                    className="block py-2 px-4 text-gray-700 hover:text-[#B30738]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </div>
              </>
            )}

            <div className="flex flex-col space-y-3 pt-2">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3">
                  {!isInWaitingRoom && (
                    <button
                      onClick={() => {
                        handleExplore();
                        setIsMenuOpen(false);
                      }}
                      className="px-6 py-2 rounded-lg text-center bg-[#B30738] text-white hover:bg-[#95052c]"
                    >
                      Explore
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-6 py-2 border border-red-500 rounded-lg text-center bg-white text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleExplore();
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2 rounded-lg text-center bg-[#B30738] text-white hover:bg-[#95052c]"
                >
                  Explore
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
