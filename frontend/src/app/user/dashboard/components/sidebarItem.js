import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ icon, text, isCollapsed, link }) => {
   const pathname = usePathname()

   return (
      <Link href={link}>
         <div 
            className={`flex items-center w-full py-4 px-6 cursor-pointer hover:bg-gray-50 transition-all duration-300 
               ${'justify-start'} 
               ${pathname == link ? "bg-gray-100 border-l-4 border-blue-700 font-semibold" : "bg-white"} 
               w-full`}
         >
            <div className="text-gray-800 text-md h-5 w-5">
               {icon}
            </div>
            {(
               <span className="text-gray-800 ml-6 text-md font-medium">{text}</span>
            )}
         </div>
      </Link>

   );
}

export default SidebarItem;
