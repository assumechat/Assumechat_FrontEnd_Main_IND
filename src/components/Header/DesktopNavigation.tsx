import Link from "next/link";
import { usePathname } from "next/navigation";
import NavigationDropdown from "./NavigationDropdown";

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

interface DesktopNavigationProps {
  isAuthenticated: boolean;
  navigationGroups: NavigationGroup[];
}

export default function DesktopNavigation({
  isAuthenticated,
  navigationGroups,
}: DesktopNavigationProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  if (!isAuthenticated) {
    return (
      <nav className="hidden md:flex font-medium space-x-14 text-md">
        {navigationGroups.map(({ label, items }) => (
          <NavigationDropdown key={label} label={label} items={items} />
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex font-medium space-x-14 text-md">
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
    </nav>
  );
}
