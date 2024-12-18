import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const Homepage = () => {
  const { logout } = useAuth0();
  const { getIdTokenClaims, getAccessTokenSilently } = useAuth0();
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
      const token = await getIdTokenClaims();
    })();
  }, [getIdTokenClaims, getAccessTokenSilently]);

  return (
    <div className="bg-gray-50 flex-1 h-full max-h-full w-full grid grid-cols-[310px_1fr]">
      <div className="bg-inherit h-full w-full flex flex-col py-[1rem] px-[2rem] border-r-[1px] border-slate-150">
        <div className="bg-inherit h-fit text-black flex flex-col mb-[2rem]">
          <p className="font-bold mb-[0.5rem]">Main</p>
          <div className="ml-[0.25rem] flex flex-col">
            <NavLink
              to="dashpanel"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-gray-800 border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 text-gray-800 dark:text-white"
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
                  : "text-gray-800 border-l-[1px] border-gray-300"
              }
            >
              <p className="h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50">
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
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
                  : "text-gray-800 border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
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
                  : "text-gray-800 border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
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
          <h1 className="font-bold">Admin</h1>
          <div className="flex flex-col ml-[0.25rem]">
            <NavLink
              to="/admin/accounts"
              className={({ isActive, isPending }) =>
                isActive
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-gray-800 border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
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
                  ? "text-blue-400 border-l-[1px] border-blue-400"
                  : "text-gray-800 border-l-[1px] border-gray-300"
              }
            >
              <p
                className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50`}
              >
                <span>
                  <svg
                    className="mr-[1rem] w-4 h-4 text-gray-800 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
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
        <button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
          className="mt-auto text-white text-opacity-[100%] font-bold px-[1rem] py-[0.5rem] rounded-md bg-gray-900"
        >
          Sign out
        </button>
      </div>
      <div className="bg-white h-full max-h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default withAuthenticationRequired(Homepage);
