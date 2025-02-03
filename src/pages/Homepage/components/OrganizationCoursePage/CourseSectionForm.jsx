import { useForm, useFieldArray } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useMemo } from "react";
import {
  getPersons,
  getCalendarSessions,
  getCalendarSessionSemester,
} from "/src/api/sql_api";
import CheckboxForm from "../../reused_components/CheckboxForm";
import ErrorIconOne from "/src/assets/exclamation-diamond.svg?react";

const CourseSectionForm = ({ hideAddFormListener, setCourses, onSubmit }) => {
  const [teachers, setTeachers] = useState([]);
  const [calendarSessions, setCalendarSessions] = useState([]);
  const [semesters, setSemesters] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      teachers: [],
      academic_year: "-1",
      semester: "-1",
    },
  });

  const selectedTeachers = watch("teachers") || [];
  const selectedAcademicYear = watch("academic_year");

  const { getAccessTokenSilently } = useAuth0();
  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "teachers", // unique name for your Field Array
  });

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const calendar_data = await getCalendarSessions(token);
      const semester_data = await getCalendarSessionSemester(token);
      let teachers_data = await getPersons(token, "faculty");

      teachers_data.map((teacher) => {
        return { ...teacher, isSelected: false }
      })

      setTeachers(teachers_data);
      setCalendarSessions(calendar_data);
      setSemesters(semester_data);
    })();
  }, []);

  const toggleCheckbox = ({ firstname, middlename, lastname }, index) => {
    setValue(`teachers.${index}.firstname`, firstname);
    setValue(`teachers.${index}.middlename`, middlename);
    setValue(`teachers.${index}.lastname`, lastname);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-20 grid grid-cols-[1fr_1fr] gap-[2rem] bg-white border-[0.1rem] shadow-md border-gray-200 rounded-md min-h-[30rem] w-[45rem] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-[2rem]"
    >
      <div className="grid grid-rows-[0.2fr_0.2fr_1fr] gap-[1rem]">
        <div className="rounded-md border-[1px] border-gray-300 flex flex-wrap justify-start items-start overflow-y-auto">
          {selectedTeachers.map((teacher, index) => {
            if (teacher.isSelected) {
              return (
                <div className="rounded-xl bg-black text-white text-[0.6rem] p-[0.5rem] flex items-center m-[0.2rem]">
                  <button type="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      className="mr-[0.2rem]"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                  </button>
                  {`${teacher.lastname}, ${teacher.firstname} ${teacher.middlename}`}
                </div>
              );
            } else {
              return "";
            }
          })}
        </div>
        <div className="w-full flex"></div>
        <div className="rounded-md flex-col flex justify-start items-start p-[1rem] overflow-y-auto">
          <CheckboxForm
            dataset={teachers}
            register={register}
            field_name="teachers"
            value_key="organizationpersonroleid"
            state_key="isSelected"
            label_key={["lastname", "firstname", "middlename"]}
            onChangeCallback={toggleCheckbox}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={hideAddFormListener}
          className="mb-[2rem] mr-auto underline text-gray-500"
        >
          <p>Back to courses</p>
        </button>
        <div className="mb-[2rem]">
          <h1 className="font-bold text-[1.5rem]">Create a new section.</h1>
          <p className="text-gray-600 text-[0.85rem]">
            Type in the following details to add a new section to this course.
          </p>
        </div>
        <div className="flex flex-col mb-[3rem]">
          <label className="mb-[1rem]">Section Name</label>
          <input
            className="border-b-[1px] focus:border-blue-400 outline-none"
            {...register("sectionName", {
              required: "Please enter a name.",
            })}
          ></input>
          {errors.sectionName && (
            <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
              <ErrorIconOne />
              {errors.sectionName.message}
            </div>
          )}
        </div>
        <div className="flex flex-col mb-[3rem]">
          <label className="mb-[1rem]">Maximum Capacity</label>
          <input
            type="number"
            className="border-b-[1px] focus:border-blue-400 outline-none"
            {...register("capacity", {
              required: "Please enter the max number of students.",
              valueAsNumber: true,
            })}
          ></input>
          {errors.capacity && (
            <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
              <ErrorIconOne />
              {errors.capacity.message}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-[1rem]">
          <div className="flex flex-col mb-[3rem]">
            <label className="mb-[1rem]">Academic Year</label>
            <select
              className="rounded-md p-[0.5rem]"
              {...register("academic_year", {
                validate: (value) => value !== "-1" || "Please pick an option.",
              })}
            >
              <option value={-1}>Please pick an option.</option>
              {calendarSessions.map((calendarSession) => {
                return (
                  <option value={calendarSession.organizationcalendarid}>
                    {calendarSession.academic_year}
                  </option>
                );
              })}
            </select>
            {errors.academic_year && (
              <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
                <ErrorIconOne />
                {errors.academic_year.message}
              </div>
            )}
          </div>
          <div className="flex flex-col mb-[3rem]">
            <label className="mb-[1rem]">Semester</label>
            <select
              className="rounded-md p-[0.5rem]"
              {...register("semester", {
                validate: (value) => value !== "-1" || "Please pick an option.",
              })}
            >
              <option value={-1}>Please select an option.</option>
              {semesters &&
                semesters[`${selectedAcademicYear}`] &&
                semesters[`${selectedAcademicYear}`].map((semester) => (
                  <option value={semester.semester_id}>
                    {semester.semester_type}
                  </option>
                ))}
            </select>
            {errors.semester && (
              <div className="bg-red-300 text-red-900 rounded-md px-[0.5rem] py-[0.5rem] mt-[0.5rem] flex items-center">
                {errors.semester.message}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-[2.5rem] bg-black rounded-md text-white mt-auto"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CourseSectionForm;
