import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import IMAGES from "/src/assets/images/Images";
import "non.geist/mono";

const Homepage = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { logout } = useAuth0();
  const { getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    (async () => {
      const idTokenClaims = await getIdTokenClaims();

      if (!idTokenClaims["approved"]) {
        navigate("/errors/notapproved");
      } else if (!idTokenClaims["filledOutInfoSheet"]) {
        navigate("/infosheet");
      }
    })();
  }, [getIdTokenClaims]);

  useEffect(() => {
    (async () => {
      const idTokenClaims = await getIdTokenClaims();
      setProfilePicture(idTokenClaims.picture);
      setEmail(idTokenClaims.email);
      setName(idTokenClaims.name);
    })();
  }, [getIdTokenClaims]);

  return (
    <div
      id="appContainer"
      className="rounded-r-lg text-black flex-1 h-full max-h-full w-full grid grid-cols-[310px_1fr]"
    >
      <div className="font-semibold bg-black rounded-r-lg h-full w-full flex flex-col py-[1rem] px-[2rem] border-r-[1px] border-slate-150">
        <div className="gap-[1rem] h-fit w-full mb-[2rem] flex items-center">
          <img className="h-10 w-10" src={IMAGES.stcf_logo} />
          <h1 className="font-bold text-white">STCF-DMS</h1>
        </div>
        <div className="bg-inherit h-fit text-white flex flex-col mb-[2rem]">
          <p className="font-bold mb-[1rem]">Main</p>
          <div className="ml-[0.25rem] flex flex-col">
            <NavLink
              to="dashpanel"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-white border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900 rounded-md`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 fill-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Homepage
              </p>
            </NavLink>
            <NavLink
              to="/student/gradespanel"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-white border-l-[1px] border-gray-300"
              }
            >
              <p className="h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900">
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 stroke-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"
                    />
                  </svg>
                </span>
                Grades
              </p>
            </NavLink>
            <NavLink
              to="/faculty/teachercoursepanel"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-white border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 stroke-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                </span>
                Courses
              </p>
            </NavLink>
            <NavLink
              to="/admin/organizationcoursespanel"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-white border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 stroke-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                </span>
                School Courses
              </p>
            </NavLink>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-white mb-[1rem]">Admin</h1>
          <div className="flex flex-col ml-[0.25rem]">
            <NavLink
              to="/admin/accounts"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-white border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 stroke-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 9h6m-6 3h6m-6 3h6M6.996 9h.01m-.01 3h.01m-.01 3h.01M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>
                </span>
                Account Requests
              </p>
            </NavLink>
            <NavLink
              to="/admin/hrpanel"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400 fill-blue-400"
                  : "text-white border-l-[1px] border-gray-300 fill-white"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                </span>
                Employees
              </p>
            </NavLink>
          </div>
        </div>
        <div className="w-full h-fit mt-auto flex gap-[1rem] text-white items-center">
          <img
            src={profilePicture}
            className="rounded-full h-[3rem] border-slate-500 border-[2px]"
          />
          <div className="max-w-[70%] flex flex-col">
            <h1 className="max-w-full text-[0.9rem] text-wrap font-bold">
              {name}
            </h1>
            <p className="max-w-full text-[0.7rem] break-words text-slate-400">
              {email}
            </p>
          </div>
          <button
            title="Logout"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
            className="h-fit w-fit p-[0.4rem] hover:bg-slate-900 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
              <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-white h-full max-h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Homepage);
