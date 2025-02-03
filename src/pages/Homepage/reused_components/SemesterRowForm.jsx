import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const SemesterRowForm = ({ sessionId }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex p-[0.5rem] gap-[1rem]">
        <div className="flex-1">
          <input
            className="w-full p-[0.2rem] rounded-md border-[1px] border-gray-200"
            {...register("semesterType", {
              required: "Please enter a name.",
            })}
          />
        </div>

        <div className="flex-1">
          <input
            className="w-full p-[0.2rem] rounded-md border-[1px] border-gray-200"
            {...register("startDate", {
              required: "Please enter a start date.",
            })}
          />
        </div>

        <div className="flex-1">
          <input
            className="w-full p-[0.2rem] rounded-md border-[1px] border-gray-200"
            {...register("endDate", {})}
          />
        </div>
      </div>
    </form>
  );
};

export default SemesterRowForm;
