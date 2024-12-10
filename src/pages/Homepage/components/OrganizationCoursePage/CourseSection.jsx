import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getCourseSections,
  createCourseSection,
  assignTeachersToCourseSection,
} from "/src/api/sql_api.jsx";
import { Link, useParams } from "react-router-dom";
import CourseSectionForm from "./CourseSectionForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Table from "../../reused_components/Table";

const CourseSection = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { courseId } = useParams();
  const [courseSections, setCourseSections] = useState([]);
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

  const columnAttr = [
    {
      id: "name",
      render: (data, row) => {
        console.log(row);
        return (
          <Link
            className="text-blue-600 underline"
            to={`/admin/organizationcoursespanel/${courseId}/${row.coursesectionid}`}
          >
            {row[`${data}`]}
          </Link>
        );
      },
    },
    {
      id: "teachers",
      render: (data, row) => {
        {
          return row[`${data}`].map((teacher, index) => {
            return (
              <div key={`${teacher.firstname}+${index}`}>
                {teacher.lastname}, {teacher.firstname}
              </div>
            );
          });
        }
      },
    },
    {
      id: "maximumcapacity",
      render: (data, row) => {
        return row[`${data}`];
      },
    },
    {
      id: "units",
      render: (data, row) => {
        return row["academic_year"] + ", " + row["semester"];
      },
    },
  ];

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
          <Table
            headers={[
              "Section Name",
              "Teacher",
              "Maximum Capacity",
              "Academic Year & Semester",
            ]}
            rowHeight="h-[3rem]"
            rows={courseSections}
            columnAttr={columnAttr}
          />
        </div>
      </div>
    </>
  );
};

export default CourseSection;
