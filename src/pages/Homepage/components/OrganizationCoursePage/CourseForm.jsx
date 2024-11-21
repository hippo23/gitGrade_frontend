const CourseForm = ({ hideAddFormListener }) => {
  return (
    <div className="bg-white border-[0.1rem] shadow-md border-gray-200 rounded-[1rem] h-[19rem] w-[30rem] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-[0.2rem] grid grid-rows-[1.5fr_0.7fr]">
      <div className="p-[1rem] flex flex-col justify-center">
        <p className="mb-[2rem] text-[1.3rem] text-[.9rem] font-bold">
          Enter a new course
        </p>
        <div className="h-[80%] grid grid-rows-2 grid-cols-[0.5fr_1fr] justify-start drop-shadow-none gap-[0.1rem] text-[0.85rem] text-gray-700">
          <div className="w-full h-full flex items-center font-bold">
            <p>Course Name</p>
          </div>
          <div className="flex items-center ml-auto w-full">
            <input className="w-full overflow-x-scroll bg-slate-100 bg-white py-[0.5rem] px-[0.1rem] rounded-md w-[45%]"></input>
          </div>
          <div className="w-full h-full flex items-center font-bold">
            <p className="mr-auto">Number of units</p>
          </div>
          <div className="flex items-center ml-auto w-full">
            <input className="w-full bg-slate-100 bg-white px-[0.1rem] py-[0.5rem] rounded-md w-[45%]"></input>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center p-[0.5rem] flex">
        <button className="ml-auto shadow-lg hover:shadow-md flex justify-center w-fit mr-[1rem] p-[0.5rem] rounded-[1.2rem] bg-orange-400 text-green-100 font-bold flex items-center hover:bg-orange-500 text-[0.80rem]">
          <span className="mr-[0.5rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-box-arrow-in-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
              />
            </svg>
          </span>
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseForm;
