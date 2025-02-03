import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getPersons } from "/src/api/sql_api";
import { createPortal } from "react-dom";
import { useForm, useFieldArray } from "react-hook-form";
import CheckboxForm from "../../reused_components/CheckboxForm";
import { useGridApiContext } from "@mui/x-data-grid";

const CourseSectionTeacherForm = (params) => {
  const { id, field, value: paramsValue } = params;
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const { getAccessTokenSilently } = useAuth0();
  const { value, error, hasFocus, container } = params;
  const apiRef = useGridApiContext();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      teachers: [],
    },
  });

  const onSubmit = (values) => {
    const selected = values.teachers.filter((row) => row.isSelected != false);
    apiRef.current.setEditCellValue({ id, field, value: selected });
    apiRef.current.stopCellEditMode({
      id,
      field,
      ignoreModifications: false,
    });
  };

  useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "teachers", // unique name for your Field Array
  });

  const form_data = watch("teachers");
  console.log(form_data)

  const toggleCheckbox = ({ firstname, middlename, lastname }, index) => {
    setValue(`teachers.${index}.firstname`, firstname);
    setValue(`teachers.${index}.middlename`, middlename);
    setValue(`teachers.${index}.lastname`, lastname);
  };

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const data = await getPersons(token, "faculty");

      const defaultSelected = paramsValue.map((value) => value.teacherId);

      const finalData = data.map((teacher) => {
        return {
          teacherId: teacher.organizationpersonroleid,
          isSelected: defaultSelected.includes(teacher.organizationpersonroleid)
            ? teacher.organizationpersonroleid
            : false,
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          middlename: teacher.middlename,
        };
      });

      setValue("teachers", finalData);

      setTeachers(finalData);
    })();
  }, [getAccessTokenSilently]);

  return (
    <>
      {createPortal(
        <div className="h-[100vh] w-[100vw] bg-black absolute z-20 opacity-70"></div>,
        document.getElementById("root"),
      )}
      {container &&
        createPortal(
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-auto items-start gap-[1rem] rounded-md bg-white flex flex-col min-h-[20rem] w-[30rem] z-50 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-[2rem]"
          >
            <button
              type="button"
              onClick={() => {
                apiRef.current.stopCellEditMode({
                  id,
                  field,
                  ignoreModifications: true,
                });
              }}
              className="text-gray-500 text-[0.8rem] underline"
            >
              Cancel Edit
            </button>
            <div>
              <h1 className="font-medium">
                Pick the teachers you want to assign to the course
              </h1>
              <p className="text-[0.8rem] text-gray-500">
                You can use the searchbar to find them quickly.
              </p>
            </div>
            <div className="w-full h-[7.5rem] border-gray-200 border-[1px] rounded-md flex flex-wrap p-[1rem] gap-[0.5rem] overflow-y-auto items-start justify-start">
              {form_data.map((teacher, index) => {
                if (teacher.isSelected != false) {
                  return (
                    <div
                      key={`${teacher.value},${index}`}
                      className="h-fit w-fit px-[1rem] py-[0.6rem] bg-black rounded-2xl text-white text-[0.8rem]"
                    >
                      {teacher.lastname}, {teacher.firstname}
                    </div>
                  );
                }
              })}
            </div>
            <div className="h-fit w-full flex gap-[0.5rem] flex-col">
              <input
                type="search"
                placeholder="Search for a teacher"
                className="border-[1px] border-gray-200 rounded-md focus:outline-none w-[40%] px-[0.6rem] py-[0.3rem]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="h-[10rem]">
                <CheckboxForm
                  dataset={teachers}
                  register={register}
                  field_name="teachers"
                  value_key="teacherId"
                  state_key="isSelected"
                  label_key={["lastname", "firstname", "middlename"]}
                  onChangeCallback={toggleCheckbox}
                  search={search}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-auto text-[0.9rem] font-medium bg-black p-[0.5rem] rounded-md text-white"
            >
              Update Data
            </button>
          </form>,
          container.current,
        )}
    </>
  );
};

export default CourseSectionTeacherForm;
