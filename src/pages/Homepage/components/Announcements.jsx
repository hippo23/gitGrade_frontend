import React from "react";
import AnnouncementCard from "./AnnouncementCard";

const Announcements = (props) => {
  return (
    <div className="h-full w-[90%] grid grid-rows-[0.2fr_1fr]">
      <div className="flex items-center border-gray-200 border-b-[1px]">
        <h1 className="text-[1.2rem] text-black font-bold">Announcements 📢</h1>
        <p className="ml-auto text-[1rem] text-black underline">View all</p>
      </div>
      <div className="flex flex-row w-full overflow-x-scroll">
        <div className="mr-[1.5rem] h-full w-[20rem] items-center justify-evenly flex flex-col flex-none">
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
        <div className="mr-[1.5rem] h-full w-[20rem] items-center justify-evenly flex flex-col flex-none">
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
        <div className="mr-[1.5rem] h-full w-[20rem] items-center justify-evenly flex flex-col flex-none">
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
        <div className="mr-[1.5rem] h-full w-[20rem] items-center justify-evenly flex flex-col flex-none">
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
        <div className="mr-[1.5rem] h-full w-[20rem] items-center justify-evenly flex flex-col flex-none">
          <AnnouncementCard />
          <AnnouncementCard />
        </div>
      </div>
    </div>
  );
};

export default Announcements;
