import CourseForm from "./CourseForm";
import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../../../api/sql_api";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AlertBoxConfirm from "../../reused_components/AlertBoxConfirm";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrganizationCoursesPanel = (props) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const refreshData = async () => {
    const accessToken = await getAccessTokenSilently();
    const res = await getAllCourses(accessToken);
    const finalRows = res.map((res, index) => {
      return { ...res, id: index + 1 };
    });
    setCourses(finalRows);
  };

  useEffect(() => {
    (async () => {
      await refreshData();
    })();
  }, [getAccessTokenSilently, getIdTokenClaims]);

  const pushEditedRow = async (row) => {
    const token = await getAccessTokenSilently();

    await updateCourse(token, {
      updates: [
        {
          courseId: row.courseid,
          description: row.description,
          units: row.units,
          name: row.name,
        },
      ],
    });

    toast.success("Info successfully changed!", {
      position: "top-right",
    });
  };

  const deleteRow = async (courseId) => {
    const token = await getAccessTokenSilently();

    await deleteCourse(token, {
      courseId: courseId,
    });

    await refreshData();
    toast.success("Course successfully deleted!");
  };

  const onSubmit = async (values) => {
    setShowAddForm(false);
    const token = await getAccessTokenSilently();
    await createCourse(token, values);

    await refreshData()
  };

  const showAddFormListener = () => {
    setShowAddForm(true);
  };

  const hideAddFormListener = () => {
    setShowAddForm(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "",
      width: 10,
    },
    {
      field: "name",
      headerName: "Course Name",
      editable: true,
      width: 250,
      renderCell: (params) => {
        return (
          <Link
            className="text-blue-600 underline"
            to={`/admin/organizationcoursespanel/${params.row.courseid}`}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      editable: true,
      flex: 1,
      renderCell: (params) => {
        params.value;
      },
    },
    {
      field: "units",
      type: "number",
      headerName: "Number of Units",
      editable: true,
      renderCell: (params) => {
        return params.row.units.toString() + ".00";
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <AlertBoxConfirm
            handleSubmitListener={() => {
              deleteRow(params.row.courseid);
            }}
            warningText="This action will permanently delete any data related to this course, and it cannot be recovered."
          />,
        ];
      },
    },
  ];

  return (
    <>
      <ToastContainer />
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

        {showAddForm
          ? createPortal(
            <div className="h-[100vh] w-[100vw] bg-black absolute z-20 opacity-70"></div>,
            document.getElementById("root"),
          )
          : ""}
        <div className="p-[1.3rem]">
          <h1 className="font-bold text-[1.7rem]">School Courses 📋</h1>
        </div>
        <div className="border-y-[1px] border-slate-150 px-[1rem] flex items-center">
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
        <DataGrid
          rows={courses}
          columns={columns}
          processRowUpdate={(updatedRow, originalRow) => {
            if (JSON.stringify(updatedRow) === JSON.stringify(originalRow)) {
              return originalRow;
            }

            if (!Number.isInteger(updatedRow.units)) {
              return { ...updatedRow, units: originalRow.units };
            }

            // if changed and changes are valid
            pushEditedRow(updatedRow);
            return updatedRow;
          }}
          onProcessRowUpdateError={() => {
            toast.error("Row failed to update.");
          }}
        />
      </div>
    </>
  );
};

export default OrganizationCoursesPanel;
