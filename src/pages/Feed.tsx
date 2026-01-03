import { useEffect } from "react";
import { UploadCard } from "../components/UploadCard";
import { MediaCard } from "../components/MediaCard";
import { useGetMediaQuery } from "../store/api";
import { trackEvent, trackPageView } from "../utils/telemetry";

export const Feed = () => {
  const {
    data: mediaList,
    isLoading: loading,
    error: queryError,
  } = useGetMediaQuery({});

  useEffect(() => {
    trackPageView('Feed');
  }, []);

  useEffect(() => {
    if (mediaList && !loading) {
      trackEvent('MediaFetch', {
        count: mediaList.length,
        success: true,
      });
    }
  }, [mediaList, loading]);

  useEffect(() => {
    if (queryError) {
      trackEvent('MediaFetch', {
        success: false,
        error: 'data' in queryError ? (queryError.data as { error?: string })?.error : 'Failed to load feed',
      });
    }
  }, [queryError]);

  const error = queryError
    ? "data" in queryError
      ? (queryError.data as { error?: string })?.error
      : "Failed to load feed"
    : "";

  return (
    <div className="space-y-6">
      <UploadCard />
      {loading ? (
        <div className="text-center py-12 text-[#667085] bg-white p-8 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          Loading feed...
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 bg-red-50 border border-red-200 rounded-xl">
          {error}
        </div>
      ) : (mediaList?.length ?? 0) === 0 ? (
        <div className="text-center py-12 text-[#667085] bg-white p-8 rounded-xl shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
          No posts found. Create the first travel moment!
        </div>
      ) : (
        <div className="space-y-3.5">
          {mediaList?.map((m) => (
            <MediaCard key={m.id} item={m} />
          ))}
        </div>
      )}
    </div>
  );
};
