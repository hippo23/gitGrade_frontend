import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCourseSections } from "/src/api/sql_api.jsx";
import { useParams } from "react-router-dom";

const CourseSection = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [courseSections, setCourseSections] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const res = await getCourseSections(token, {
        courseId: courseId,
      });

      console.log(res);
      setCourseSections(res);
    })();
  }, [getAccessTokenSilently, courseId]);

  return (
    <div className="h-full w-full bg-white overflow-hidden grid grid-rows-[0.1fr_0.07fr_1fr]">
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
            </tr>
          </thead>
          <tbody>
            {courseSections.map((section) => {
              return (
                <tr className="h-[3rem] w-full">
                  <td className="px-6 py-3 text-blue-600 underline">
                    {section.name}
                  </td>
                  <td className="px-6 py-3">
                    {section.lastname + ", " + section.firstname}
                  </td>
                  <td className="px-6 py-3">{section.maximumcapacity}</td>
                  <td className="px-6 py-3">
                    {"AY " +
                      section.academic_year +
                      ", Semester " +
                      section.semester}
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

export default CourseSection;
