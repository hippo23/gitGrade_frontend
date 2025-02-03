import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getCourseSections,
  createCourseSection,
  updateCourseSection,
  assignTeachersToCourseSection,
  getCalendarSessions,
  getCalendarSessionSemester,
} from "/src/api/sql_api.jsx";
import { Link, useParams } from "react-router-dom";
import CourseSectionForm from "./CourseSectionForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import CourseSectionTeacherForm from "./CourseSectionTeacherForm";
import AlertBoxConfirm from "../../reused_components/AlertBoxConfirm";
import CalendarSessionDropdown from "../../reused_components/CalendarSessionDropdown";
import {
  useSemesterPrompt,
  useCalendarSessionPrompt,
} from "../../reused_components/AlertDialogSemester";

const CourseSection = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { courseId } = useParams();
  const { open: semesterOpen, elem: semesterElem } = useSemesterPrompt();
  const [courseSections, setCourseSections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const containerRef = useRef(null);
  const calendarSessionsRef = useRef([]);
  const calendarSemestersRef = useRef({});

  // for first load
  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const res = await getCourseSections(token, {
        courseId: courseId,
      });

      const calendar_data = await getCalendarSessions(token);
      const semester_data = await getCalendarSessionSemester(token);
      calendarSessionsRef.current = calendar_data;
      calendarSemestersRef.current = semester_data;

      // for data regarding the different sections

      const rows = res.map((row, index) => {
        return { ...row, id: index + 1 };
      });

      setCourseSections(rows);
    })();
  }, [getAccessTokenSilently, courseId]);

  const showAddFormListener = () => {
    setShowAddForm(true);
  };

  const hideAddFormListener = () => {
    setShowAddForm(false);
  };

  // for the course form
  const onSubmit = async (values) => {
    const token = await getAccessTokenSilently();
    const teachers = values.teachers
      .filter((teacher) => teacher.isSelected != false)
      .map((teacher) => teacher.isSelected);

    console.log(values)

    const data = {
      courseId: courseId,
      semesterId: values.semester,
      name: values.sectionName,
      maximumCapacity: values.capacity,
      teacherIds: teachers
    };

    await createCourseSection(token, data);

    const res = await getCourseSections(token, {
      courseId: courseId,
    });

    const rows = res.map((row, index) => {
      return { ...row, id: index + 1 };
    });

    setCourseSections(rows);
    setShowAddForm(false);
    toast.success("👍 Course section added!");
  };

  // for the table
  const pushEditedRows = async (updatedRow) => {
    console.log(updatedRow)
    const token = await getAccessTokenSilently();
    const { coursesectionid } = updatedRow;

    const teacherAssignmentChanges = updatedRow.teachers.map(
      (teacher) => teacher.teacherId,
    );

    const changedInfo = {
      courseSectionId: updatedRow.coursesectionid,
      semesterId: updatedRow.semesterid,
      name: updatedRow.name,
      maximumCapacity: updatedRow.maximumcapacity,
    };

    await assignTeachersToCourseSection(token, {
      courseSectionId: coursesectionid,
      teacherIds: teacherAssignmentChanges,
    });

    await updateCourseSection(token, changedInfo)

    toast.success("Course section updated successfully!");
  };

  // for the columns of the table
  const columns = [
    { field: "id", headerName: "", width: 10 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
      renderCell: (params) => {
        return (
          <Link
            className="text-blue-600 underline"
            to={`/admin/organizationcoursespanel/${courseId}/${params.row.coursesectionid}`}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "teachers",
      headerName: "Teachers In-charge",
      editable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="overflow-x-auto flex gap-[0.5rem] h-full flex-center items-center">
            {params.value.map((teacher, index) => {
              return (
                <div
                  key={`${teacher.firstname}+${index}`}
                  className="text-sky-700 bg-sky-100 border-blue-500 border-[1px] text-[0.8rem] h-[2rem] flex justify-center items-center rounded-md py-[0.1rem] px-[0.4rem]"
                >
                  {teacher.lastname}, {teacher.firstname}
                </div>
              );
            })}
          </div>
        );
      },
      renderEditCell: (params) => {
        return (
          <CourseSectionTeacherForm container={containerRef} {...params} />
        );
      },
    },
    {
      field: "maximumcapacity",
      headerName: "Maximum Capacity of Section",
      type: "number",
      editable: true,
      width: 150,
    },
    {
      field: "organizationcalendarid",
      headerName: "Academic Year",
      type: "singleSelect",
      valueOptions: [
        ...calendarSessionsRef.current.map((calendarSession) => {
          return {
            value: calendarSession.organizationcalendarid,
            label: calendarSession.academic_year,
          };
        }),
      ],
      editable: true,
      width: 150,
    },
    {
      field: "semesterid",
      headerName: "Semester",
      type: "singleSelect",
      editable: true,
      valueOptions: ({ row }) => {
        const calendarSession = row.organizationcalendarid
        return calendarSemestersRef.current[calendarSession].map((semester) => {
          return {
            value: semester.semester_id,
            label: semester.semester_type
          }
        }
        )
      },
      width: 150,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      cellClassName: "actions",
      maxWidth: 100,
      getActions: () => {
        return [
          <AlertBoxConfirm
            handleSubmitListener={() => { }}
            warningText="This action will permanently delete any data related to this course, and it cannot be recovered."
          />,
        ];
      },
    },
  ];

  return (
    <>
      <ToastContainer />
      <div
        ref={containerRef}
        className="h-full w-full bg-white overflow-hidden grid grid-rows-[0.1fr_0.07fr_1fr]"
      >
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
          <button className="rounded-md hover:bg-gray-100 h-fit py-[0.4rem] px-[1rem] min-w-[5rem] text-[0.75rem] mr-[0.5rem]">
            Create Calendar Year
          </button>
          <CalendarSessionDropdown />
          <button
            onClick={() => {
              semesterOpen().then((value) => { });
            }}
            className="rounded-md hover:bg-gray-100 h-fit py-[0.4rem] px-[1rem] min-w-[5rem] text-[0.75rem] mr-[1rem]"
          >
            Create Semester
            {semesterElem}
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
        <div className="h-[100%] w-full overflow-auto flex">
          <DataGrid
            columns={columns}
            rows={courseSections}
            processRowUpdate={(updatedRow, originalRow) => {
              if (JSON.stringify(updatedRow) == JSON.stringify(originalRow)) {
                return originalRow;
              } else if (
                calendarSemestersRef.current[updatedRow.organizationcalendarid].length == 0
              ) {
                toast.error(
                  "Warning: There is no existing semester for your academic year. Please change accordingly.",
                );
                return { ...updatedRow, semesterid: null };
              } else if (
                // check for any other null or empty values in the row
                Object.values(updatedRow).some(
                  (value) => value === null || value === "",
                )
              ) {
                toast.error(
                  "Warning: Some fields do not have valid value. Please change accordingly.",
                );
                return updatedRow;
              } else if (updatedRow.organizationcalendarid != originalRow.organizationcalendarid) {
                return { updatedRow, semesterid: calendarSemestersRef.current[0].semester_id }
              }

              pushEditedRows(updatedRow);
              return updatedRow;
            }}
            onProcessRowUpdateError={(err) => {
              toast.error("Failure to edit row.")
              throw err
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CourseSection;
