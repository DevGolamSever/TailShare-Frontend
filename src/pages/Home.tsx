import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#0f172a] flex flex-col">
      <Header user={null} />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#0f172a] mb-4">
          Share Your Travel Moments
        </h1>
        <p className="text-xl text-[#667085] mb-8">
          TrailShare helps travellers showcase photos and videos, discover collaborators, and
          share amazing travel experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signup"
            className="px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors font-medium text-lg"
          >
            Get Started
          </Link>
          <Link
            to="/feed"
            className="px-6 py-3 bg-white text-[#2563eb] border-2 border-[#2563eb] rounded-lg hover:bg-[#f7fafc] transition-colors font-medium text-lg"
          >
            Explore Feed
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="text-3xl mb-2">✈️</div>
            <h3 className="font-semibold text-[#0f172a] mb-2">Travel Moments</h3>
            <p className="text-sm text-[#667085]">
              Share your amazing travel experiences with photos and videos
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="font-semibold text-[#0f172a] mb-2">Global Community</h3>
            <p className="text-sm text-[#667085]">
              Connect with travellers and discover new destinations worldwide
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="font-semibold text-[#0f172a] mb-2">Discover</h3>
            <p className="text-sm text-[#667085]">
              Find travel partners and trending destinations by tags
            </p>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

