import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SemesterRowForm = ({ sessionId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = () => { };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex p-[0.5rem] gap-[1rem]">
        <div className="flex-1">
          <span className="text-xs">Semester #</span>
          <select
            {...register("semesterType", {
              required: "Please select a semester type.",
            })}
            className="w-full p-[0.2rem] rounded-md border-[1px] border-gray-200 text-sm"
          >
            <option>1</option>
            <option>2</option>
          </select>
        </div>

        <div className="flex-1">
          <span className="text-xs">Start Date</span>
          <input
            type="date"
            className="w-full p-[0.2rem] rounded-md border-[1px] border-gray-200 text-sm"
            {...register("startDate", {
              required: "Please enter a start date.",
            })}
          />
        </div>

        <div className="flex-1">
          <span className="text-xs">End Date</span>
          <input
            type="date"
            className="w-full p-[0.2rem] rounded-md border-[1px] border-gray-200 text-sm"
            {...register("endDate", {})}
          />
        </div>
      </div>
    </form>
  );
};

export default SemesterRowForm;
