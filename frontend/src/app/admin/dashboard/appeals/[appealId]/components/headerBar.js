import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAppeal } from "@/app/services/fetchServices";

const HeaderBar = ({ appealId, links, back }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [appeal, setAppeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAppeal(appealId);
        setAppeal(response);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [appealId]);

  return (
<div className="bg-gradient-to-r from-slate-600 to-slate-800 to-slate-600 px-6 pt-6 border-b border-slate-600 text-white shadow-sm">
  {appeal && (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-start gap-4">
          <Link
            href={back}
            className="text-slate-300 hover:text-white transition-colors pt-1"
          >
            <FaArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white flex flex-wrap items-center gap-3">
              Claim #: {appeal.claim_number}
              {appeal.submitted === 0 && (
                <>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                    Draft
                  </span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                    Appeal Deadline:{" "}
                    {new Date(appeal.appeal_deadline).toLocaleDateString("en-US")}
                  </span>
                </>
              )}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              {appeal.submitted === 1
                ? `Filed: ${new Date(appeal.date_filed).toLocaleDateString("en-US")}`
                : `Created: ${new Date(appeal.created_at).toLocaleDateString("en-US")}`}
            </p>
          </div>
        </div>

        {appeal.submitted === 0 && (
          <button
            onClick={() => router.push(`/appeal/${appeal.id}/patient-details`)}
            className="px-6 py-2 text-sm font-semibold bg-slate-600 hover:bg-slate-500 rounded-full transition"
          >
            Edit
          </button>
        )}
      </div>

      <div className="flex gap-6 pl-1 sm:pl-10 border-t border-slate-600 pt-4 overflow-x-auto">
        {links.map((item, index) => {
          const isActive = pathname === item.pathName;
          return (
            <Link
              key={index}
              href={item.pathName}
              className={`pb-2 px-2 sm:px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "text-white border-b-2 border-white"
                  : "text-slate-300 hover:text-white hover:border-b-2 hover:border-white/60"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  )}
</div>

  );
};

export default HeaderBar;
