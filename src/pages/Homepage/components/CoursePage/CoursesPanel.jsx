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
      <div className="bg-gray-100 grid px-4 py-4 pr-14 grid-cols-5 border border-solid border-t-0 divide-x-2">
        <span className="font-bold col-span-1 px-4">Course Name</span>
        <span className="font-bold col-span-2 px-4">Course Sched</span>
        <span className="font-bold col-span-2 px-4">Course Details</span>
      </div>
      {[{
        name: "WWFU/WWX",
        details: "details about the course here",
        sched: "Wed, Fri: (8:30 - 10:00)",
        students: [{ name: "Jeremiah Buizon", grade: 2, number: "2023-12345" }, { name: "Simon Magleo", grade: 2, number: "2023-12345" }]
      }, {
        name: "WWFU/WWX",
        details: "details about the course here",
        sched: "Wed, Fri: (8:30 - 10:00)",
        students: [{ name: "Jeremiah Buizon", grade: 2, number: "2023-12345" }, { name: "Simon Magleo", grade: 2, number: "2023-12345" }]
      }].map((s, indexS) => {
        const { name, students, details, sched } = s
        return (
          <>
            <BetterDropDown
              label={
                <div
                  className="w-full grid grid-cols-5 divide-x-2 h-fit w-full transition-all duration-300 ease-out cursor-pointer"
                >
                  <span className="px-4">{name}</span>
                  <span className="col-span-2 px-4">{sched}</span>
                  <span className="col-span-2 px-4">{details}

                  </span>
                </div>
              }
              labelStyles={indexS % 2 != 0 ? "py-4 px-4 w-full pr-10 hover:brightness-[95%] bg-gray-100" : "py-4 px-4 w-full pr-10 hover:brightness-[95%] bg-white"}
              containerStyles={"w-full py-0 px-0"}
            >

              <div>
                <div className={clsx("px-4 py-3 divide-x-2 font-bold grid grid-cols-5 border-solid border border-x-0", indexS % 2 != 0 ? "bg-white" : "bg-gray-100")}>
                  <span className="col-span-2 px-4">
                    Student Name
                  </span>
                  <span className="px-4">
                    Student Number
                  </span>
                  <span className="px-4">
                    Student Grade
                  </span>
                </div>
                {students.map((p, indexP) => {
                  const { name, grade, number } = p;
                  const [editingGrade, setEditingGrade] = useState(false)
                  return (
                    <div className={clsx("divide-x-2 px-4 py-3 grid grid-cols-5 border border-solid border-x-0 border-t-0", indexS % 2 != 0 ? indexP % 2 != 0 ? " bg-white" : " bg-gray-100" : indexP % 2 != 0 ? " bg-gray-100" : " bg-white")}>
                      <span className="col-span-2 px-4">{name}</span>
                      <span className="px-4">{number}</span>
                      {editingGrade ?
                        <form className="flex flex-row justify-between items-center px-4 w-full col-span-2">
                          <input className="rounded-md py-0 px-4"
                            inputMode="numeric" placeholder="Enter grade here"></input>
                          <button className="text-sm bg-black text-white border-none outline-none transition-all duration-300 ease-out rounded-md px-2 py-1"
                            onClick={() => setEditingGrade(false)}>Save</button>
                        </form> :
                        <div className="flex flex-row items-center justify-between col-span-2 px-4">
                          <span className="px-4">{grade}</span>
                          <button className="text-sm bg-black border-none outline-none text-white transition-all duration-300 ease-out rounded-md px-2 py-1"
                            onClick={() => setEditingGrade(true)}>
                            Edit Grade
                          </button>
                        </div>}
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
