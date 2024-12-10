import CourseForm from "./CourseForm";
import React, { useEffect, useState } from "react";
import { getAllCourses, createCourse } from "../../../../api/sql_api";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Table from "../../reused_components/Table";

const OrganizationCoursesPanel = (props) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [courses, setCourses] = useState([]);

  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const res = await getAllCourses(accessToken);
      setCourses(res);
    })();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  const showAddFormListener = () => {
    setShowAddForm(true);
  };

  const hideAddFormListener = () => {
    setShowAddForm(false);
  };

  const onSubmit = async (values) => {
    setShowAddForm(false);
    const token = await getAccessTokenSilently();
    await createCourse(token, values);
    const updatedCourses = await getAllCourses(token);

    setCourses([...updatedCourses]);
  };

  const columnAttr = [
    {
      id: "name",
      render: (data, row) => {
        return (
          <Link
            className="text-blue-600 underline"
            to={`/admin/organizationcoursespanel/${row.courseid}`}
          >
            {row[`${data}`]}
          </Link>
        );
      },
    },
    {
      id: "",
      render: (data, row) => {
        return row[`${data}`];
      },
    },
    {
      id: "description",
      render: (data, row) => {
        return row[`${data}`];
      },
    },
    {
      id: "units",
      render: (data, row) => {
        return row[`${data}`];
      },
    },
  ];

  return (
    <div className="h-full w-full bg-white overflow-hidden grid grid-rows-[0.1fr_0.07fr_1fr]">
      {showAddForm ? (
        <CourseForm
          hideAddFormListener={hideAddFormListener}
          setCourses={setCourses}
          onSubmit={onSubmit}
        />
      ) : (
        ""
      )}
      <div className="p-[1.3rem]">
        <h1 className="font-bold text-[1.7rem]">School Courses 📋</h1>
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
          rowHeight="h-[3rem]"
          headers={[
            "Course Name",
            "Class Code",
            "Description",
            "Number of units",
          ]}
          columnAttr={columnAttr}
          rows={courses}
        />
      </div>
    </div>
  );
};

export default OrganizationCoursesPanel;
