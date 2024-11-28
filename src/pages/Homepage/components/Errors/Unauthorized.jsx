const UnauthorizedPage = () => {
  return (
    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
      <div className="h-[25rem] w-[30rem] bg-white flex flex-col items-center justify-center rounded-md shadow-lg">
        <div className="h-fit w-fit p-[2rem] border-[2px] border-orange-200 rounded-md mb-[1rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5rem"
            height="5rem"
            fill="orange"
            viewBox="0 0 16 16"
          >
            <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
          </svg>
        </div>
        <div className="p-[2rem] flex flex-col">
          <h1 className="font-bold text-orange-700 self-center mb-[1rem]">
            ERROR
          </h1>
          <p>
            You are not permitted to access this page. If there are any problems
            or concerns you'd like to raise, please contact the admin at{" "}
            <span className="text-blue-500 underline">aamagleo@gmail.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
