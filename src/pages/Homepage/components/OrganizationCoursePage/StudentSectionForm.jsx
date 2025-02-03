import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { getPersons } from "../../../../api/sql_api";
import { useAuth0 } from "@auth0/auth0-react";
import CheckboxForm from "../../reused_components/CheckboxForm";

const StudentSectionForm = ({ hideForm, onSubmit }) => {
  const [students, setStudents] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formStudents: [],
    },
  });

  const data = watch();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      let data = await getPersons(token, "student");
      data = data.map((student) => {
        return { ...student, isSelected: false }
      })
      setStudents([...data]);
    })();
  }, [getAccessTokenSilently]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-white border-[0.1rem] shadow-md border-gray-200 rounded-md h-[40rem] w-[30rem] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-[3rem] z-20"
    >
      <div>
        <button className="underline mb-[2rem]" onClick={hideForm}>
          Cancel
        </button>
        <h1 className="font-bold text-[1.4rem]">Add Students.</h1>
        <p className="text-gray-700">
          Choose the students you'd like to enrol into this section.
        </p>
      </div>
      <div className="flex-1 pt-[1rem] overflow-auto">
        <CheckboxForm
          dataset={students}
          register={register}
          field_name="formStudents"
          value_key="organizationpersonroleid"
          state_key="isSelected"
          label_key={["firstname", "lastname"]}
          onChangeCallback={() => { }}
        />
      </div>
      <button
        type="submit"
        className="hover:bg-gray-900 mt-[1rem] py-[0.5rem] w-full bg-black rounded-md text-white"
      >
        Enrol Students
      </button>
    </form>
  );
};

export default StudentSectionForm;
