import { useState, useEffect } from "react";
import { MediaCard } from "../components/MediaCard";
import { useSearchQuery, useGetTrendingQuery } from "../store/api";
import { trackPageView } from "../utils/telemetry";

export const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    trackPageView('Explore');
  }, []);
  
  const { data: trendingData, isLoading: loadingTrending } = useGetTrendingQuery(undefined, {
    skip: !!searchQuery,
  });
  
  const { data: searchData, isLoading: loadingSearch } = useSearchQuery(searchQuery, {
    skip: !searchQuery,
  });

  const tags = trendingData?.tags || [];
  const media = searchQuery ? (searchData?.media || []) : (trendingData?.media || []);
  const loading = searchQuery ? loadingSearch : loadingTrending;

  return (
    <div>
      <div className="bg-white rounded-xl p-4 mb-4 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
        <div className="font-semibold text-[#0f172a] mb-3">Trending Tags</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="inline-block px-2.5 py-1.5 bg-[#eef2ff] text-[#2563eb] rounded-full text-[13px] hover:bg-[#dbe7ff] cursor-pointer transition-colors border-0"
            >
              #{tag}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by title, tag or user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-[#dbe7ff] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
        />
      </div>
      {loading ? (
        <div className="text-center py-12 text-[#667085] bg-white p-8 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          Loading...
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-12 text-[#667085] bg-white p-8 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          No posts to explore yet.
        </div>
      ) : (
        <div className="space-y-3.5">
          {media.map((m) => (
            <MediaCard key={m.id} item={m} />
          ))}
        </div>
      )}
    </div>
  );
};

