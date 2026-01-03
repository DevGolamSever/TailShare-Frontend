import { Link, useNavigate } from "react-router";
import type { User } from "../types";
import { SearchBox } from "./SearchBox";
import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface HeaderProps {
  user: User | null;
}

export const Header = ({ user }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state) => state.auth.user);
  const displayUser = user || authUser;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-white to-[#fbfdff] border-b border-[#e6eef8] sticky top-0 z-[6]">
      <div className="max-w-[1100px] mx-auto w-full flex items-center gap-3">
        <Link to="/" className="text-xl font-bold text-[#2563eb] whitespace-nowrap">
          TrailShare
        </Link>
        <div className="flex-1 max-w-[640px]">
          <SearchBox />
        </div>
        {displayUser ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/feed")}
              className="bg-white border border-[#d1e3ff] px-3 py-2 rounded-lg cursor-pointer bg-[#2563eb] text-white border-0 hover:bg-[#1d4ed8] transition-colors"
            >
              New Post
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-sm font-semibold text-white">
                {displayUser.name[0].toUpperCase()}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-[#667085] hover:text-[#2563eb] transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="px-3 py-2 text-[#667085] hover:text-[#2563eb] transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-[#2563eb] text-white px-3 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

