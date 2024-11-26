import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState, useMemo } from "react";
import {
  InfosheetPageOne,
  InfosheetPageTwo,
  InfosheetPageThree,
} from "./InfosheetPages/InfosheetPages";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { postAccountRequest } from "/src/api/sql_api";
import axios from "axios";

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

  const privacyStatement = watch("privacy_statement");

  const pages = [
    <InfosheetPageOne
      register={register}
      setValue={setValue}
      errors={errors}
    />,
    <InfosheetPageTwo control={control} />,
    <InfosheetPageThree control={control} />,
  ];

  useEffect(() => {
    setTotalPages(pages.length)
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
    const idTokenClaims = await getIdTokenClaims();
    console.log(idTokenClaims);
    if (validPage) {
      console.log({ ...data, email: idTokenClaims["email"] });
      // once user has accomplished form, we will add their details to the database
      postAccountRequest({ ...data, email: idTokenClaims["email"] });
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
              disabled={!privacyStatement}
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
