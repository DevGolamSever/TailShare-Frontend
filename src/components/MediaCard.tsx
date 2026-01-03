import { useState } from "react";
import { timeAgo } from "../utils/helpers";
import { useAppSelector } from "../store/hooks";
import { EditMediaModal } from "./EditMediaModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import type { MediaItem } from "../types";

interface MediaCardProps {
  item: MediaItem;
}

export const MediaCard = ({ item }: MediaCardProps) => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isOwner = currentUser?.id === item.author?.id;

  return (
    <>
      <article className="bg-white rounded-xl overflow-hidden shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
        <div className="bg-black flex items-center justify-center h-80 overflow-hidden cursor-pointer md:h-[320px]">
          {item.type === "video" ? (
            <video
              src={item.thumb}
              controls
              className="w-full h-full object-cover"
              preload="metadata"
            />
          ) : (
            <img
              src={item.thumb}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        <div className="p-3.5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1">
              <div className="font-bold text-[#0f172a]">{item.title}</div>
              <div className="text-xs text-[#667085]">
                {item.author?.name || "Unknown"} • {timeAgo(item.uploadedAt)}
              </div>
            </div>
            {isOwner && (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="p-1.5 text-[#667085] hover:text-[#2563eb] hover:bg-[#eef2ff] rounded transition-colors"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setIsDeleteOpen(true)}
                  className="p-1.5 text-[#667085] hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
          <div className="text-xs text-[#667085] mb-2">
            {(item.tags || []).map((tag) => `#${tag}`).join(" ")}
          </div>
          <div className="mt-2 text-[#334155] text-sm">{item.description}</div>
          <div className="mt-3 flex gap-2">
            <button className="bg-white border border-[#eef2ff] px-3 py-2 rounded-lg cursor-pointer text-sm hover:bg-[#f7fafc] transition-colors">
              ❤ 0
            </button>
            <button className="bg-white border border-[#eef2ff] px-3 py-2 rounded-lg cursor-pointer text-sm hover:bg-[#f7fafc] transition-colors">
              💬 0
            </button>
            <button className="bg-white border border-[#eef2ff] px-3 py-2 rounded-lg cursor-pointer text-sm hover:bg-[#f7fafc] transition-colors">
              Open
            </button>
          </div>
        </div>
      </article>

      {isEditOpen && (
        <EditMediaModal media={item} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      )}

      {isDeleteOpen && (
        <DeleteConfirmModal
          media={item}
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </>
  );
};

