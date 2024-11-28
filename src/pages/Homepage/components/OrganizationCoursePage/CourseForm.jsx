import { useForm } from "react-hook-form";

const CourseForm = ({ hideAddFormListener }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => console.log(values);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white border-[0.1rem] shadow-md border-gray-200 rounded-md min-h-[25rem] w-[30rem] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] pt-[2rem] pb-[3rem] px-[2rem]"
    >
      <button
        onClick={hideAddFormListener}
        className="mb-[2rem] mr-auto underline text-gray-500"
      >
        <p>Back to courses</p>
      </button>
      <div className="mb-[2rem]">
        <h1 className="font-bold text-[1.5rem]">Enter a new course.</h1>
        <p className="text-gray-600 text-[0.85rem]">
          Type in the details to register a new course to the University...
        </p>
      </div>
      <div className="flex flex-col mb-[3rem]">
        <label className="mb-[1rem]">Course Name</label>
        <input
          className="border-b-[1px] focus:border-blue-400 outline-none"
          {...register("name", {
            required: "Please enter a name.",
          })}
        ></input>
        {errors.name && (
          <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="mr-[0.5rem]"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            {errors.name.message}
          </div>
        )}
      </div>
      <div className="flex flex-col mb-[3rem]">
        <label className="mb-[1rem]">Number of Units</label>
        <input
          type="number"
          className="border-b-[1px] focus:border-blue-400 outline-none"
          {...register("units", {
            required: "Please enter the number of units.",
            valueAsNumber: true,
          })}
        ></input>
        {errors.units && (
          <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="mr-[0.5rem]"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            {errors.units.message}
          </div>
        )}
      </div>
      <div className="flex flex-col mb-[3rem]">
        <label className="mb-[1rem]">Description</label>
        <input
          className="border-b-[1px] focus:border-blue-400 outline-none"
          {...register("description", {
            required: "Please enter a description.",
          })}
        ></input>
        {errors.description && (
          <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="mr-[0.5rem]"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
            </svg>
            {errors.description && errors.description.message}
          </div>
        )}
      </div>
      <button
        type="Submit"
        className="w-full h-[2.5rem] bg-black rounded-md text-white mt-auto"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
