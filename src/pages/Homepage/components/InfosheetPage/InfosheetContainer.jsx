import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState, useMemo } from "react";
import {
  InfosheetPageOne,
  InfosheetPageTwo,
  InfosheetPageThree,
} from "./InfosheetPages/InfosheetPages";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { createNewPerson } from "/src/api/sql_api";

const InfosheetContainer = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentAppMetadata, setCurrentAppMetadata] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const { user, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

  const pages = [
    <InfosheetPageOne
      register={register}
      setValue={setValue}
      errors={errors}
    />,
  ];

  useEffect(() => {
    setTotalPages(pages.length);
  }, []);

  const nextPageListener = async () => {
    const validPage = await trigger();
    if (validPage && pageNumber < pages.length - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPageListener = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onSubmit = async (data) => {
    const validPage = await trigger();

    const token = await getAccessTokenSilently();
    if (validPage) {
      console.log({ ...data });
      // once user has accomplished form, we will add their details to the database
      const personId = await createNewPerson(token, data);

      // then set the metadata to note that they have accomplished the form, and add their personal user id to the metadata / token
      const token = await getAccessTokenSilently();
      console.log(token);
      const data = {
        app_metadata: {
          personId: personId,
          filledOutInfoSheet: true,
        },
      };

      await updateUserAccount(token, user.user_sub, data);
    }
  };

  // create context providers for the setting page number function

  return (
    <form
      className="h-full w-full bg-inherit flex items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="items-center grid grid-rows-[1fr_auto_auto]">
        <div className="flex items-center justify-center h-full w-full">
          {pages[pageNumber]}
        </div>
        <div className="ml-auto mr-auto mb-[4rem] w-[70%] h-fit w-full flex">
          <button
            type="button"
            onClick={previousPageListener}
            className="hover:bg-blue-500 mr-auto bg-blue-400 px-[1rem] py-[0.5rem] rounded-md text-white"
          >
            Previous Page
          </button>
          {pageNumber < totalPages - 1 ? (
            <button
              type="button"
              onClick={nextPageListener}
              className="hover:bg-blue-500 bg-blue-400 px-[1rem] py-[0.5rem] rounded-md text-white"
            >
              Next Page
            </button>
          ) : (
            <button
              type="submit"
              className="hover:bg-blue-500 bg-blue-400 px-[1rem] py-[0.5rem] rounded-md text-white"
            >
              Submit
            </button>
          )}
        </div>
        <div className="mb-[2rem] flex items-center justify-center">
          <div className="w-[70%] h-[0.25rem]">
            <div
              className="bg-green-500 h-full rounded-xl"
              style={{ width: `${((pageNumber + 1) * 100) / totalPages}%` }}
            ></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default withAuthenticationRequired(InfosheetContainer);
