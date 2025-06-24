"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use } from "react";
import FileUploadSection from "../components/fileUploadSection";
import { useContext } from "react";
import { FormContext } from "@/app/context/formContext";

const DetailsLayout = ({ params, children }) => {
   const { appealId } = use(params);
   const pathName = usePathname();
   const {status} = useContext(FormContext)

   const links = [
      { title: "Patient", path: `/user/dashboard/appeals/${appealId}/details/patient` },
      { title: "Letter", path: `/user/dashboard/appeals/${appealId}/details/letter` },
      { title: "Appealer", path: `/user/dashboard/appeals/${appealId}/details/appealer` },
      { title: "Procedure", path: `/user/dashboard/appeals/${appealId}/details/procedure` },
   ];

   return (
      <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 pb-12">
         {/* Upload Section */}
         {status == "draft" && <FileUploadSection />}

         {/* Main Layout Container */}
         <div className="mt-2 bg-white rounded-xl shadow-md max-w-6xl mx-auto flex overflow-hidden border border-slate-200">
         {/* Sidebar */}
         <aside className="w-1/4 bg-slate-50 border-r border-slate-200 p-6 space-y-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4 pl-1">
               Sections
            </h3>
            {links.map((item, index) => {
               const isActive = pathName === item.path;
               return (
               <Link
                  key={index}
                  href={item.path}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-all ${
                     isActive
                     ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-sm"
                     : "text-slate-700 hover:bg-slate-100"
                  }`}
               >
                  {item.title}
               </Link>
               );
            })}
         </aside>

         {/* Main Content */}
         <main className="w-3/4 p-8 bg-white">{children}</main>
         </div>
      </div>
   );
};

export default DetailsLayout;
