import { useEffect, useState } from "react";
import {
  getStudentCourseSection,
  updateStudentCourseSection,
  assignStudentsToCourseSection,
  deployStudentGrades,
  clearStudentGrade,
} from "/src/api/sql_api";
import { useAuth0 } from "@auth0/auth0-react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import StudentSectionForm from "./StudentSectionForm";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useUndo } from "../../custom_hooks/customHooks";
import UndoIcon from "/src/assets/arrow-clockwise.svg?react";
import RedoIcon from "/src/assets/arrow-counterclockwise.svg?react";
import TrashIcon from "/src/assets/trash.svg?react";
import MenuIcon from "/src/assets/menuone.svg?react";
import RowActionsMenu from "../../reused_components/RowActionsMenu";

const CourseSectionDetails = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const {
    getState: editGetState,
    changeState: editChangeState,
    undoChange: editUndoChange,
    redoChange: editRedoChange,
    resetHistory: editResetHistory,
  } = useUndo({});
  const {
    getState: studentGetState,
    changeState: studentChangeState,
    undoChange: studentUndoChange,
    redoChange: studentRedoChange,
    clearHistory: studentClearHistory,
  } = useUndo();
  const { getAccessTokenSilently } = useAuth0();
  const { courseSectionId } = useParams();

  const refreshGrade = async () => {
    const token = await getAccessTokenSilently();
    const res = await getStudentCourseSection(token, {
      courseSectionId: courseSectionId,
    });

    const rows = res.map((student, index) => {
      return {
        id: index,
        personId: student.organizationpersonroleid,
        studentCourseSectionId: student.studentcoursesectionid,
        pendingStudentCourseSectionId: student.pendingstudentcoursesectionid,
        gradeStatus: student.gradestatus,
        name: student.lastname + ", " + student.firstname,
        grade: student.grade,
        remarks: student.remarks,
        visibleGrade: student.visiblegrade,
        isDeleted: false,
      };
    });

    studentChangeState(rows);
  };

  useEffect(() => {
    (async () => {
      await refreshGrade();
    })();
  }, []);

  const addToEditedRows = (row) => {
    editChangeState({ ...editGetState(), [row.personId]: row });
  };

  const pushEditedRows = async () => {
    const token = await getAccessTokenSilently();
    const changedStudents = Object.keys(editGetState()).map((key) => {
      return editGetState()[key];
    });

    const deletedIds = studentGetState()
      .filter((student) => student.isDeleted)
      .map((student) => student.personId);

    await updateStudentCourseSection(token, {
      changedStudents,
      deletedIds,
      courseSectionId
    });

    // clear history
    editResetHistory();
    studentClearHistory();

    toast.success("User data succesfully changed!", {
      position: "top-right",
    });
  };

  const deployEdits = async () => {
    await pushEditedRows();
    const token = await getAccessTokenSilently();
    await deployStudentGrades(token, { courseSectionId });
    await refreshGrade();
    toast.success("Student grades successfully deployed!");
  };

  const onSubmitAddForm = async (values) => {
    // assign students to the section
    const token = await getAccessTokenSilently();

    const studentIds = values.formStudents
      .filter((student) => student.isSelected != false)
      .map((student) => student.isSelected);

    const data = {
      courseSectionId,
      studentIds
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
        studentCourseSectionId: student.studentcoursesectionid,
        pendingStudentCourseSectionId: student.pendingstudentcoursesectionid,
        gradeStatus: student.gradestatus,
        name: student.lastname + ", " + student.firstname,
        grade: student.grade,
        remarks: student.remarks,
      };
    });

    studentChangeState(rows);

    toast.success("Students successfully added!", {
      position: "bottom-center",
    });

    setShowAddForm(false);
  };

  const syncCellEdit = (updatedRow) => {
    const updatedRows = studentGetState().map((row) =>
      row.id === updatedRow.id ? updatedRow : row,
    );
    studentChangeState(updatedRows);
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
    {
      field: "visibleGrade",
      headerName: "Visible Grade",
      editable: false,
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<TrashIcon />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={() => {
              studentChangeState(
                studentGetState().map((student) =>
                  student.id === params.id
                    ? { ...student, isDeleted: true }
                    : student,
                ),
              );
              let removeFromEdit = { ...editGetState() }
              delete removeFromEdit[params.row.personId]
              editChangeState(removeFromEdit);
            }}
          />,
          <GridActionsCellItem
            icon={
              <RowActionsMenu
                row={params}
                Icon={<MenuIcon />}
                actions={[
                  {
                    name: "Clear Grade",
                    method: async () => {
                      const token = await getAccessTokenSilently();
                      console.log(params)
                      await clearStudentGrade(token, {
                        courseSectionId,
                        studentIds: [params.row.personId]
                      });
                      params.row.visibleGrade = null;
                      toast.success("Student grades successfully cleared!");
                      await refreshGrade();
                    },
                  },
                  {
                    name: "View Profile",
                    method: () => { },
                  },
                ]}
              />
            }
            label="Cancel"
            className="textPrimary"
            onClick={() => { }}
            color="inherit"
          />,
        ];
      },
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
        <header className="w-full h-fit flex flex-row justify-center items-center border-b-[1px] border-gray-200 px-[1rem]">
          <div className="p-[0.5rem] flex flex-col">
            <h1>Grade Book</h1>
            <p className="text-gray-400 mr">
              {editGetState() && Object.keys(editGetState()).length == 0
                ? "All changes up to date!"
                : "Unsaved Changes"}
            </p>
          </div>
          <div className="ml-auto flex mr-[3rem] gap-[1rem]">
            <button
              onClick={() => {
                studentUndoChange();
                editUndoChange();
              }}
              className="h-full hover:bg-gray-100 p-[0.2rem] rounded-md"
            >
              <UndoIcon />
            </button>
            <button
              onClick={() => {
                studentRedoChange();
                editRedoChange();
              }}
              className="h-full hover:bg-gray-100 p-[0.2rem] rounded-md"
            >
              <RedoIcon />
            </button>
          </div>
          <div className="mr-[3rem] w-fit flex items-center">
            <button
              className="hover:bg-gray-200 mr-[1.25rem] p-[0.4rem] rounded-md"
              title="Deploy Grades"
              onClick={deployEdits}
            >
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
              title="Save Changes"
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
            checkboxSelection
            rows={
              studentGetState() &&
              studentGetState().filter((student) => !student.isDeleted)
            }
            columns={columns}
            rowHeight={40}
            processRowUpdate={(updatedRow, originalRow) => {
              if (JSON.stringify(updatedRow) === JSON.stringify(originalRow)) {
                return originalRow;
              }
              addToEditedRows(updatedRow);
              syncCellEdit(updatedRow);
              return updatedRow;
            }}
            onProcessRowUpdateError={(err) => {
              console.log("failure to update row.");
              throw err
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CourseSectionDetails;
