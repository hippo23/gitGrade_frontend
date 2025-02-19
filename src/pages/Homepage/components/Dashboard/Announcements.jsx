import React, { useState } from "react";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementPopup from "./AnnouncementPopup";
import { createPortal } from "react-dom";

const Announcements = () => {
  const [viewAnnouncement, setViewAnnouncement] = useState(false)

  return (
    <div className="px-[4rem] h-full w-[100%] grid grid-rows-[0.2fr_1fr] bg-gray-50">
      <div className="flex items-center border-gray-200 border-b-[1px]">
        <h1 className="text-[1.2rem] text-black font-bold">Announcements 📢</h1>
        <button onClick={() => setViewAnnouncement(true)} className="ml-auto text-[1rem] text-black underline">View all</button>
      </div>
      <div className="flex flex-row w-full overflow-x-scroll">
        <AnnouncementCard color='amber-200' />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
        <AnnouncementCard />
      </div>
      {viewAnnouncement && createPortal(
        <AnnouncementPopup setPopupState={setViewAnnouncement} />, document.getElementById("root")
      )}
    </div >
  );
};

export default Announcements;
