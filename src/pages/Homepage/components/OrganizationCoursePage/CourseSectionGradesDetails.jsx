import { useEffect, useState } from "react";
import {
  getStudentCourseSection,
  updateStudentCourseSection,
  assignStudentsToCourseSection,
} from "/src/api/sql_api";
import { useAuth0 } from "@auth0/auth0-react";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import StudentSectionForm from "./StudentSectionForm";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import { useParams } from "react-router-dom";

const CourseSectionDetails = () => {
  const [editedStudents, setEditedStudents] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { courseSectionId } = useParams();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const res = await getStudentCourseSection(token, {
        courseSectionId: courseSectionId,
      });

      const rows = res.map((student, index) => {
        return {
          id: index,
          personId: student.personid,
          pendingStudentCourseSectionId: student.pendingstudentcoursesectionid,
          gradeStatus: student.gradestatus,
          name: student.lastname + ", " + student.firstname,
          grade: student.grade,
          remarks: student.remarks,
        };
      });

      setStudents([...rows]);
    })();
  }, []);

  const addToEditedRows = (row) => {
    setEditedStudents({ ...editedStudents, [row.personId]: row });
  };

  const pushEditedRows = async () => {
    const token = await getAccessTokenSilently();
    const updates = Object.keys(editedStudents).map((key) => {
      return editedStudents[key];
    });

    updateStudentCourseSection(token, {
      updates: updates,
    });

    setEditedStudents({});

    toast.success("User data succesfully changed!", {
      position: "bottom-center",
    });
  };

  const onSubmitAddForm = async (values) => {
    // assign students to the section
    const token = await getAccessTokenSilently();

    const studentIds = values.formStudents
      .filter((student) => student.value != false)
      .map((student) => student.value);

    const data = {
      courseSectionId: courseSectionId,
      studentIds: studentIds,
    };

    await assignStudentsToCourseSection(token, data);

    // refresh data
    const res = await getStudentCourseSection(token, {
      courseSectionId: courseSectionId,
    });

    const rows = res.map((student, index) => {
      return {
        id: index,
        personId: student.personid,
        pendingStudentCourseSectionId: student.pendingstudentcoursesectionid,
        gradeStatus: student.gradestatus,
        name: student.lastname + ", " + student.firstname,
        grade: student.grade,
        remarks: student.remarks,
      };
    });

    setStudents([...rows]);

    toast.success("Students successfully added!", {
      position: "bottom-center",
    });

    setShowAddForm(false);
  };

  const syncCellEdit = (params) => {
    const updatedRows = students.map((row) =>
      row.id === params.id ? { ...row, [params.field]: params.value } : row,
    );
    setRows([...updatedRows]);
  };

  // create the columnAttr for the table
  // we need the index of the table, the students name, the students
  // grade (in input format), and a double click option that allows them to add remarks

  const columns = [
    { field: "id", headerName: "", width: 10 },
    {
      field: "gradeStatus",
      headerName: "Grade Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["rejected", "pending", "approved"],
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }
        return clsx("", {
          "bg-red-100": params.value == "rejected",
          "bg-yellow-100": params.value == "pending",
          "bg-green-100": params.value == "approved",
        });
      },
      renderCell: (params) => {
        // Capitalize the value for display only
        return <span className="capitalize">{params.value}</span>;
      },
    },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "grade",
      headerName: "Grade",
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "1.00",
        "1.25",
        "1.50",
        "1.75",
        "2.00",
        "2.25",
        "2.50",
        "2.75",
        "3.00",
        "5.00",
      ],
    },
    {
      field: "remarks",
      headerName: "Remarks",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <>
      {showAddForm ? (
        <StudentSectionForm
          hideForm={() => setShowAddForm(false)}
          onSubmit={onSubmitAddForm}
        />
      ) : null}
      <ToastContainer />
      <div className="h-full w-full grid grid-rows-[auto_1fr]">
        <header className="w-full h-fit flex flex-row justify-center border-b-[1px] border-gray-200 px-[1rem]">
          <div className="p-[0.5rem] flex flex-col">
            <h1>Grade Book</h1>
            <p className="text-gray-400 mr">
              {Object.keys(editedStudents).length === 0
                ? "All changes up to date!"
                : "Unsaved Changes"}
            </p>
          </div>
          <div className="m-auto">
            <button className="font-bold text-[0.9rem] mr-[2rem]">
              Pending
            </button>
            <button className="font-bold text-[0.9rem]">Deployed</button>
          </div>
          <div className="ml-auto mr-[3rem] w-fit flex items-center">
            <button className="hover:bg-gray-200 mr-[1.25rem] p-[0.4rem] rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-2.8 7a.5.5 0 1 1-.928-.372l1.895-4.738-7.494 7.494 1.376 2.162a.5.5 0 1 1-.844.537l-1.531-2.407L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM5.93 9.363l7.494-7.494L1.591 6.602z" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z" />
              </svg>
            </button>
            <button
              className="hover:bg-gray-200 rounded-md p-[0.4rem]"
              onClick={pushEditedRows}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 2H9v3h2z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
              </svg>
            </button>
          </div>
          <input
            type="search"
            className="w-[10rem] bg-gray-100 rounded-md h-fit p-[0.5rem] my-auto"
          />
        </header>
        <div className="flex flex-col">
          <header className="w-full h-fit px-[1rem] py-[0.5rem]">
            <button
              className="rounded-md bg-black py-[0.3rem] px-[0.8rem]"
              onClick={() => setShowAddForm(true)}
            >
              <span className="text-white text-[0.8rem]">Add Students</span>
            </button>
          </header>
          <DataGrid
            rows={students}
            columns={columns}
            rowHeight={25}
            processRowUpdate={(updatedRow, originalRow) => {
              console.log(updatedRow);
              addToEditedRows(updatedRow);
              return updatedRow;
            }}
            onProcessRowUpdateError={() => {
              console.log("failure");
            }}
            onCellEdit={syncCellEdit}
          />
        </div>
      </div>
    </>
  );
};

export default CourseSectionDetails;
