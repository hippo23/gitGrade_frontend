const AnnouncementPopup = ({ setPopupState }) => {
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-black absolute z-10 opacity-70"></div>
      ,
      <div className="overflow-y-auto bg-white z-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[80%] w-[70%] rounded-md">
        <div className="-z-10 px-[3rem] h-full w-full absolute grid grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          <div className="-z-10 border-l-dashed border-l-[1px] border-gray-200" />
          <div className="-z-10 border-dashed border-r-[1px] border-gray-200" />
          <div className="-z-10 border-dashed border-r-[1px] border-gray-200" />
          <div className="-z-10 border-dashed border-r-[1px] border-gray-200" />
          <div className="-z-10 border-r-[1px] border-gray-200" />
        </div>
        <div className="w-full flex items-center py-[2rem] px-[3rem] gap-[0.5rem]">
          <button
            className="rounded-md bg-blue-700 px-[1rem] py-[0.5rem] text-white hover:bg-blue-900 hover:text-blue-300"
            onClick={() => {
              setPopupState(false);
            }}
          >
            Exit Tab
          </button>
          <button className="rounded-md bg-blue-700 px-[1rem] py-[0.5rem] text-white hover:bg-blue-900 hover:text-blue-300">
            Create New Announcement
          </button>
          <button className="ml-auto rounded-md bg-blue-700 px-[1rem] py-[0.5rem] text-white hover:bg-blue-900 hover:text-blue-300">
            Filter
          </button>
          <input
            className="rounded-md bg-gray-100 border-[1px] border-gray-200 h-fit py-[0.5rem] px-[1rem]"
            placeholder="Search for an announcement."
          />
        </div>
        <div className="z-20 p-[3rem] w-full min-h-[35rem] max-h-[35rem] grid grid-rows-[40px_100px_1fr] grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          <div className="border-l-[1.5px] border-l-blue-400 px-[1rem] flex items-center col-start-1 col-end-5 row-start-1 row-end-1">
            <p className="font-semibold">Criminology 101</p>
          </div>
          <div className="border-l-[1.5px] border-l-blue-700 px-[1rem] flex items-center col-start-5 col-end-6 row-start-1 row-end-1">
            <p>February 11, 2025</p>
          </div>
          <div className="pl-[1rem] flex items-center col-start-1 col-end-5 pr-[3rem]">
            <h1 className="text-[2.0rem] font-bold">
              Regarding Schedule of Final Examinations
            </h1>
          </div>
          <div className="col-start-5 col-end-6 flex items-center justify-center">
            <div className="flex gap-[1rem]">
              <img
                className="w-14 h-14 rounded-full border-[3px] border-gray-150"
                src="https://images.unsplash.com/photo-1739812821764-d7f3562b41ef?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dfull"
                alt="Rounded avatar"
              />
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-semibold">Simon Magleo</h1>
                <p className="text-[0.8rem]">Site Administrator</p>
              </div>
            </div>
          </div>
          <div className="row-start-3 row-end-4 pl-[1rem] pr-[4rem] col-start-1 col-end-4 text-gray-700">
            <p>
              With the rise of usage-based billing for AI services, the
              strategic importance of credits is growing. That’s why we’ve
              recently added a new credits feature to Stripe Billing. Recent AI
              upgrades to Adaptive Acceptance led to a record $6 billion in
              false declines recovered in 2024—a 60% year-over-year increase.
            </p>
          </div>
          <img
            className="w-full h-full min-h-0 min-w-0 object-fill rounded-md col-start-4 col-end-6 shadow-xl"
            src="https://images.unsplash.com/photo-1739812821764-d7f3562b41ef?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="z-20 p-[3rem] w-full min-h-[35rem] max-h-[35rem] grid grid-rows-[40px_100px_1fr] grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          <div className="border-l-[1.5px] border-l-blue-400 px-[1rem] flex items-center col-start-1 col-end-5 row-start-1 row-end-1">
            <p className="font-semibold">Math 40: Linear Algebra</p>
          </div>
          <div className="border-l-[1.5px] border-l-blue-700 px-[1rem] flex items-center col-start-5 col-end-6 row-start-1 row-end-1">
            <p>February 11, 2025</p>
          </div>
          <div className="pl-[1rem] flex items-center col-start-1 col-end-5 pr-[3rem]">
            <h1 className="text-[2.0rem] font-bold">
              Lecture 5 Videos Released
            </h1>
          </div>
          <div className="col-start-5 col-end-6 flex items-center justify-center">
            <div className="flex gap-[1rem]">
              <img
                className="w-14 h-14 rounded-full border-[3px] border-gray-150"
                src="https://images.unsplash.com/photo-1739812821764-d7f3562b41ef?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dfull"
                src="https://images.unsplash.com/photo-1739812821764-d7f3562b41ef?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Rounded avatar"
              />
              <div className="flex flex-col items-start justify-center">
                <h1 className="font-semibold">Simon Magleo</h1>
                <p className="text-[0.8rem]">Site Administrator</p>
              </div>
            </div>
          </div>
          <div className="row-start-3 row-end-4 pl-[1rem] pr-[4rem] col-start-1 col-end-4 text-gray-700">
            <p>
              We created a usage-based billing system with an accurate and
              highly available revenue ledger; real-time events processing with
              ultrahigh throughput billing; and the ability to support complex
              pricing models and accurate billing, even in the face of delayed
              events. Doing so required reimagining how to build a highly
              scaled, highly reliable event streaming platform. Recent AI
              upgrades to Adaptive Acceptance led to a record $6 billion in
              false declines recovered in 2024—a 60% year-over-year increase.
            </p>
          </div>
          <img
            className="w-full h-full min-h-0 min-w-0 object-fill rounded-md col-start-4 col-end-6 shadow-xl"
            src="https://images.unsplash.com/photo-1739219959019-dd317f76c7e8?q=80&w=3516&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </>
  );
};

export default AnnouncementPopup;
