import { useState, useEffect } from "react";
import { getTeacherSectionAssignment } from "../../../../api/sql_api";
import { useAuth0 } from "@auth0/auth0-react";
import clsx from "clsx";
import BetterDropDown from "../../reused_components/BetterDropDown"
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
    <div className="h-full w-full bg-white overflow-hidden flex flex-col">
      <div className="p-[1.3rem]">
        <h1 className="font-bold text-[1.7rem]">Your Sections 📋</h1>
      </div>
      <hr className="border border-1 border-b-0 border-x-0 border-solid " />
      <div className="bg-gray-100 grid px-4 py-4 grid-cols-5 border border-solid border-t-0 divide-x-2">
        <span className="font-bold col-span-1 px-4">Course Name</span>
        <span className="font-bold col-span-2 px-4">Course Sched</span>
        <span className="font-bold col-span-2 px-4">Course Details</span>
      </div>
      {[{
        name: "WWFU/WWX",
        details: "details about the course here",
        sched: "Wed, Fri: (8:30 - 10:00)",
        students: [{ name: "Jeremiah Buizon", grade: 2 }, { name: "Simon Magleo", grade: 2 }]
      }, {
        name: "WWFU/WWX",
        details: "details about the course here",
        sched: "Wed, Fri: (8:30 - 10:00)",
        students: [{ name: "Jeremiah Buizon", grade: 2 }, { name: "Simon Magleo", grade: 2 }]
      }].map((s, index) => {
        const { name, students, details, sched } = s
        const [classOpen, setClassOpen] = useState(false);
        return (
          <>
            <BetterDropDown
              label={
                <div
                  className={clsx("w-full grid grid-cols-5 divide-x-2 h-fit w-full py-4 px-4 hover:brightness-[95%] transition-all duration-300 ease-out cursor-pointer", index % 2 != 0 && "bg-gray-50", index % 2 == 0 && "bg-white")}
                >
                  <span className="px-4">{name}</span>
                  <span className="col-span-2 px-4">{sched}</span>
                  <span className="col-span-2 px-4">{details}</span>
                </div>
              }
              labelStyles={"w-full py-0 px-0"}
              containerStyles={"w-full py-0 px-0"}
            >

              <div>
                {students.map((p) => {
                  const { name, grade } = p;
                  return (
                    <div>
                      {name}
                      {grade}
                    </div>
                  )
                })}
              </div>
            </BetterDropDown>
          </>
        )
      })}

    </div>
  );
};

export default TeacherCoursesPanel;
