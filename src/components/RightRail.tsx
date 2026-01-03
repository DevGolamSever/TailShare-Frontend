import type { User } from "../types";
import { useAppSelector } from "../store/hooks";

interface RightRailProps {
  user: User | null;
}

export const RightRail = ({ user }: RightRailProps) => {
  const authUser = useAppSelector((state) => state.auth.user);
  const displayUser = user || authUser;

  return (
    <div className="space-y-3">
      <div className="bg-white p-4 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)] mb-3">
        <h3 className="font-semibold text-[#0f172a] mb-2">Your Profile</h3>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-white font-bold text-[22px] my-2.5">
          {displayUser ? displayUser.name[0].toUpperCase() : "T"}
        </div>
        <div className="font-semibold text-[#0f172a]">
          {displayUser ? displayUser.name : "Traveller"}
        </div>
        <div className="text-[#667085] text-[13px]">
          Share trips · Find collaborators
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)] mb-3">
        <h4 className="font-semibold text-[#0f172a] mb-2">Tags</h4>
        <div id="tagCloud" className="flex flex-wrap gap-2">
          {/* Tags will be populated dynamically */}
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
        <h4 className="font-semibold text-[#0f172a] mb-2">Tips</h4>
        <p className="text-[#667085] text-[13px]">
          Upload photos or short videos. Use tags to increase discoverability.
        </p>
      </div>
    </div>
  );
};

