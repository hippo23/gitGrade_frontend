import clsx from "clsx";

const AnnouncementCard = ({ color }) => {
  return (
    <div className={clsx("relative h-full w-full min-w-[15rem] bg-gray-50")}>
      <div className={clsx("p-[2rem] min-h-[12rem] m-auto absolute bottom-0 left-0 top-0 right-0 transition-all ease-in-out hover:shadow-md hover:scale-105 cursor-pointer h-[80%] w-[95%] border-[1px] border-gray-200 rounded-md shadow-lg")}>
        <div className="flex flex-col pointer-events-none h-full">
          <div className="flex flex-col justify-end">
            <p className="text-[0.8rem] underline">Course</p>
            <h1 className="font-bold">Regarding Finals Examination Schedule</h1>
            <p className="text-[0.85rem]">
              Utilities for controlling how an individual flex or grid item is
              positioned...
            </p>
          </div>
          <div className="mt-auto flex flex-row items-end">
            <p className="text-[0.7rem]">July 23, 2024</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-auto mt-auto size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
