import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getCourseSections,
  createCourseSection,
  assignTeachersToCourseSection,
} from "/src/api/sql_api.jsx";
import { useParams } from "react-router-dom";
import CourseSectionForm from "./CourseSectionForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const CourseSection = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [courseSections, setCourseSections] = useState([]);
  const { courseId } = useParams();
  const [showAddForm, setShowAddForm] = useState(false);

  const showAddFormListener = () => {
    setShowAddForm(true);
  };

  const hideAddFormListener = () => {
    setShowAddForm(false);
  };

  const onSubmit = async (values) => {
    const token = await getAccessTokenSilently();
    const teachers = values.teachers
      .filter((teacher) => teacher.value != false)
      .map((teacher) => teacher.value);

    const data = {
      courseId: courseId,
      semesterId: values.semester,
      sectionName: values.sectionName,
      maximumCapacity: values.capacity,
    };

    const { coursesectionid } = await createCourseSection(token, data);

    await assignTeachersToCourseSection(token, {
      courseSectionId: coursesectionid,
      teacherIds: teachers,
    });

    const res = await getCourseSections(token, {
      courseId: courseId,
    });

    setCourseSections(res);
    setShowAddForm(false);
    toast("👍 Course section added!");
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const res = await getCourseSections(token, {
        courseId: courseId,
      });

      console.log(res);

      // for data regarding the different sections
      const Ids = res
        .map((section) => {
          return section.teachers.map((teacher) => teacher.id).join(" OR ");
        })
        .join("");

      setCourseSections(res);
      // for data on the various semesters in the school
    })();
  }, [getAccessTokenSilently, courseId]);

  return (
    <>
      <ToastContainer />
      <div className="h-full w-full bg-white overflow-hidden grid grid-rows-[0.1fr_0.07fr_1fr]">
        {showAddForm ? (
          <CourseSectionForm
            hideAddFormListener={hideAddFormListener}
            onSubmit={onSubmit}
          />
        ) : (
          ""
        )}
        <div className="p-[1.3rem]">
          <h1 className="font-bold text-[1.7rem]">
            {courseSections[0] && courseSections[0].course_name} 📋
          </h1>
        </div>
        <div className="border-y-[1px] border-slate-150 px-[1rem] flex items-center">
          <button className="rounded-md hover:bg-gray-100 h-fit py-[0.4rem] px-[1rem] min-w-[5rem] text-[0.75rem] mr-[1rem]">
            Calendar Year
          </button>
          <button className="h-fit p-[1rem] min-w-[4rem] text-[0.75rem] mr-[0.5rem] underline">
            First Semester
          </button>
          <button className="h-fit p-[1rem] min-w-[4rem] text-[0.75rem] mr-[0.5rem] underline">
            Second Semester
          </button>
          <button
            onClick={showAddFormListener}
            className="shadow-md bg-red-500 h-fit px-[1rem] py-[0.4rem] min-w-[4rem] text-[0.75rem] mr-[0.5rem] underline ml-auto hover:bg-red-600 flex items-center justify-center w-fit rounded-md"
          >
            <span>
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </span>
          </button>
        </div>
        <div className="h-[100%] w-full overflow-auto">
          <table className="table-auto m-auto h-full overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="">
              <tr className="h-[1.5rem] bg-white border-y-[1px] border-slate-150">
                <th scope="col" className="px-6 py-3">
                  Section Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Teacher
                </th>
                <th scope="col" className="px-6 py-3">
                  Maximum Capacity
                </th>
                <th scope="col" className="px-6 py-3">
                  Academic Year & Semester
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="overflow-y-auto">
              {courseSections.map((section, index) => {
                return (
                  <tr
                    className="h-[3rem] w-full overflow-hidden"
                    key={`${index}+section.name+section.semester`}
                  >
                    <td className="px-6 py-3 text-blue-600 underline">
                      {section.name}
                    </td>
                    <td className="h-[3rem] px-6 py-3 flex flex-col items-start overflow-y-auto">
                      {section.teachers.map((teacher, index) => {
                        return (
                          <div key={`${section.name}+${teacher.id}`}>
                            {teacher.lastname}, {teacher.firstname}
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-6 py-3">{section.maximumcapacity}</td>
                    <td className="px-6 py-3">
                      {"AY " +
                        section.academic_year +
                        ", Semester " +
                        section.semester}
                    </td>
                    <td className="px-6 py-3 flex items-center justify-around w-full">
                      <button className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </button>
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="red"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CourseSection;
