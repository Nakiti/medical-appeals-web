import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ icon, text, isCollapsed, link }) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link href={link}>
      <div
        className={`flex items-center gap-4 w-full px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
          ${isActive
            ? "bg-indigo-50 text-indigo-600 font-semibold border-l-4 border-indigo-500"
            : "text-gray-700 hover:bg-gray-50"
          }`}
      >
        <div className="text-lg">{icon}</div>
        {isCollapsed && <span className="text-sm">{text}</span>}
      </div>
    </Link>
  );
};

export default SidebarItem;
