import { useState, useEffect } from "react";
import { getTeacherSectionAssignment } from "../../../../api/sql_api";
import { useAuth0 } from "@auth0/auth0-react";

const TeacherCoursesPanel = () => {
  const [teacherCourses, setTeacherCourses] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const res = await getTeacherSectionAssignment(accessToken, 3);
      console.log(res);
      setTeacherCourses(res);
    })();
  }, [getAccessTokenSilently]);

  return (
    <div className="h-full w-full bg-white overflow-hidden grid grid-rows-[0.1fr_0.07fr_1fr]">
      <div className="p-[1.3rem]">
        <h1 className="font-bold text-[1.7rem]">Your Courses 📋</h1>
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
        <button className="shadow-md bg-red-500 h-fit px-[1rem] py-[0.4rem] min-w-[4rem] text-[0.75rem] mr-[0.5rem] underline ml-auto hover:bg-red-600 flex items-center justify-center w-fit rounded-md">
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
          <thead className="h-[2rem] relative z-1 text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3">
                Section Name
              </th>
              <th scope="col" className="px-6 py-3">
                Student Capacity / Maximum
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {teacherCourses.map((course, index) => {
              console.log(course);
              return (
                <tr
                  key={course.coursename + course.sectionname + index}
                  className="relative h-[1.5rem] bg-white border-y-[1px] border-slate-150"
                >
                  <td className="pl-[1.2rem] underline hover:text-blue-700 cursor-pointer">
                    {course.coursename}
                  </td>
                  <td className="p-[1.2rem]">{course.sectionname}</td>
                  <td></td>
                  <td className="p-[0.5rem]">
                    {course.completionstatus ? (
                      <p className="text-green-700 bg-green-100 w-fit p-[0.5rem] rounded-md border-[0.1rem] border-green-400">
                        Completed
                      </p>
                    ) : (
                      <p className="text-orange-700 bg-orange-100 w-fit p-[0.5rem] rounded-md border-[0.1rem] border-orange-400">
                        Ongoing
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherCoursesPanel;
