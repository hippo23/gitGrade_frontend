const AnnouncementCard = (props) => {
  return (
    <div className="p-[1rem] h-[45%] w-full border-[1px] border-gray-200 rounded-md shadow grid grid-rows-[0.3fr_1fr_0.5fr]">
      <p className="text-[0.8rem] underline">Course</p>
      <div className="flex flex-col justify-end">
        <h1 className="font-bold">Regarding Finals Examination Schedule</h1>
        <p className="text-gray-600 text-[0.85rem]">
          Utilities for controlling how an individual flex or grid item is
          positioned...
        </p>
      </div>
      <div className="flex flex-row items-end">
        <p className="text-[0.7rem]">July 23, 2024</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-auto size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnnouncementCard;
