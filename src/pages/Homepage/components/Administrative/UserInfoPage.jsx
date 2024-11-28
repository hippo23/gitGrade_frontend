import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserAccounts,
  getUserRoles,
  disableUserRoles,
  clearUserRoleRecords,
  addUserRoles,
} from "/src/api/auth0_api";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [userInfo, setUserInfo] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [originalRoles, setOriginalRoles] = useState({});
  const [roles, setRoles] = useState({
    admin: false,
    student: false,
    faculty: false,
  });
  const saveButton = useRef(null);

  useEffect(() => {
    (async () => {
      // set the current users info
      const token = await getAccessTokenSilently();
      const response = await getUserAccounts(token, { user_id: userId });
      setUserInfo({ ...response[0] });

      // retrieve the current roles of the user
      const currentRoles = await getUserRoles(token, userId);

      const roles_data = {
        admin: {
          active: false,
          name: "admin",
          code: "rol_SoW0bAKj2EFJjq9p",
        },
        student: {
          active: false,
          name: "student",
          code: "rol_O4q4clcTvOeed7q6",
        },
        faculty: {
          active: false,
          name: "faculty",
          code: "rol_BSKVuiyht3oW58My",
        },
      };

      currentRoles.map((role) => {
        roles_data[role.name.toLowerCase()].active = true;
      });
      setRoles({
        ...roles_data,
      });
      setOriginalRoles({
        ...roles_data,
      });
    })();
  }, [getAccessTokenSilently, userId]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target; // Get checkbox name and checked value
    setRoles((prevState) => ({
      ...prevState,
      [name]: {
        active: checked,
        code: prevState[name].code,
      },
    }));
  };

  const saveRoleChanges = async () => {
    saveButton.current.disabled = true;
    const token = await getAccessTokenSilently();
    const user = await getUserAccounts(token, { user_id: userId });
    console.log(user);
    const personId = user[0].app_metadata.personId;

    // need to delete all the previous roles of the user
    const deleteRoles = [];
    Object.keys(originalRoles).forEach(function (key, index) {
      if (originalRoles[key].active == true) {
        deleteRoles.push(originalRoles[key].code);
      }
    });

    if (deleteRoles.length > 0) {
      await disableUserRoles(token, userId, {
        roles: [...deleteRoles],
      });
    }

    // then add the added roles to the user
    const addRoles = [];
    const roleNames = [];
    Object.keys(roles).forEach(function (key, index) {
      if (roles[key].active == true) {
        addRoles.push(originalRoles[key].code);
        roleNames.push(originalRoles[key].name);
      }
    });

    console.log(roleNames);
    if (addRoles.length > 0) {
      await addUserRoles(token, userId, {
        roles: [...addRoles],
        role_names: [...roleNames],
        personid: personId,
      });
    }

    const currentRoles = await getUserRoles(token, userId);

    const roles_data = {
      admin: {
        active: false,
        name: "admin",
        code: "rol_SoW0bAKj2EFJjq9p",
      },
      student: {
        active: false,
        name: "student",
        code: "rol_O4q4clcTvOeed7q6",
      },
      faculty: {
        active: false,
        name: "faculty",
        code: "rol_BSKVuiyht3oW58My",
      },
    };

    // set the new roles to avoid any data conflicts
    currentRoles.map((role) => {
      roles_data[role.name.toLowerCase()].active = true;
    });
    setRoles({
      ...roles_data,
    });
    setOriginalRoles({
      ...roles_data,
    });

    toast("👍 User permissions have been updated!");
    saveButton.current.disabled = false;
  };

  const handleClearRole = async (code, name) => {
    const token = await getAccessTokenSilently();
    const user = await getUserAccounts(token, { user_id: userId });
    const personId = user[0].app_metadata.personId;

    await disableUserRoles(token, userId, {
      roles: [code],
    });

    await clearUserRoleRecords(token, userId, {
      role_names: [name],
      personid: personId,
    });

    const currentRoles = await getUserRoles(token, userId);

    const roles_data = {
      admin: {
        active: false,
        name: "admin",
        code: "rol_SoW0bAKj2EFJjq9p",
      },
      student: {
        active: false,
        name: "student",
        code: "rol_O4q4clcTvOeed7q6",
      },
      faculty: {
        active: false,
        name: "faculty",
        code: "rol_BSKVuiyht3oW58My",
      },
    };

    // set the new roles to avoid any data conflicts
    currentRoles.map((role) => {
      roles_data[role.name.toLowerCase()].active = true;
    });
    setRoles({
      ...roles_data,
    });
    setOriginalRoles({
      ...roles_data,
    });

    toast("👍 User records have been cleared!");
  };

  return (
    <>
      <ToastContainer />
      <div className="h-full w-full grid grid-rows-[auto_1fr] place-items-center">
        <div className="h-[5rem] bg-inherit border-b-[1px] border-gray-300 w-full"></div>
        <div className="bg-inherit h-full w-full px-[15%] grid grid-rows-[auto_1fr]">
          <header className="w-full h-[15rem] grid grid-rows-[auto_1fr_auto] pt-[1rem]">
            <div className="w-full bg-inherit flex items-center justify-start underline text-gray-500">
              <Link to="/accounts/">Back to users</Link>
            </div>
            <div className="w-full bg-inherit flex items-center">
              <div className="w-fit h-full flex flex-row items-center">
                <img
                  className="h-[60%] rounded-full m-[1rem]"
                  src={userInfo && userInfo.picture}
                  alt="Rounded avatar"
                />
                <div className=" h-full w-fit flex flex-col justify-center">
                  <h1 className="text-[2rem]">{userInfo && userInfo.name}</h1>
                  <p>{userInfo && userInfo.email}</p>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 ml-auto px-[1rem] py-[0.5rem] rounded-md w-fit text-white">
                Actions
              </button>
            </div>
            <div className="w-full h-fit flex flex-row items-center justify-start">
              <p
                className={`px-[0.5rem] py-[0.4rem] border-b-[1px] ${currentTab == 0 ? "text-blue-700 border-blue-700 border-opacity-100" : " border-gray-300"}`}
              >
                <button onClick={() => setCurrentTab(0)}>Details</button>
              </p>
              <p
                className={`px-[0.5rem] py-[0.4rem] border-b-[1px] ${currentTab == 1 ? "text-blue-700 border-blue-700 border-opacity-100" : " border-gray-300"}`}
              >
                <button onClick={() => setCurrentTab(1)}>Roles</button>
              </p>
              <div className="h-full py-[0.4rem] flex-1 border-b-[1px] border-gray-300 text-white text-opacity-0">
                filler
              </div>
            </div>
          </header>
          <div className="h-full w-full flex overflow-hidden">
            {currentTab == 0 ? (
              <div className="h-[80%] w-full border-[1px] border-gray-300 rounded-md m-auto grid grid-cols-[1fr_1fr_1fr_1.4fr] grid-rows-3 overflow-x-auto py-[1rem]">
                <div className="row-span-1 flex">
                  <div className="mx-auto h-fit w-[80%] min-w-[10rem] flex flex-col">
                    <h1 className="text-gray-500">Username</h1>
                    <p>{}</p>
                  </div>
                </div>
                <div className="row-span-1 flex"></div>
                <div className="row-span-1 flex"></div>
                <div className="col-start-1 col-end-1 row-start-2 row-end-2 flex"></div>
                <div className="col-start-2 col-end-2 row-start-2 row-end-2 flex"></div>
                <div className="col-start-3 col-end-3 row-start-2 row-end-2 flex"></div>
                <div className="col-start-1 col-end-1 row-start-3 row-end-3 flex"></div>
                <div className="col-start-2 col-end-2 row-start-3 row-end-3 flex"></div>
                <div className="col-start-3 col-end-3 row-start-3 row-end-3 flex"></div>
                <div className="col-start-4 col-end-4 row-start-1 row-end-4">
                  <h1 className="text-gray-500">Active Courses</h1>
                </div>
              </div>
            ) : (
              <div className="h-[90%] w-full m-auto grid grid-rows-[auto_1fr]">
                <header className="w-full h-fit mb-[2rem] flex">
                  <p>Change what this user is able to do.</p>
                  <button
                    ref={saveButton}
                    onClick={saveRoleChanges}
                    className="bg-blue-600 hover:bg-blue-700 ml-auto px-[1rem] py-[0.5rem] rounded-md w-fit text-white flex items-center"
                  >
                    Save Changes
                  </button>
                </header>
                <table className="h-full w-full text-left">
                  <thead>
                    <tr className="h-[4rem] text-xs text-gray-700 uppercase border-b-[1px] border-gray-200">
                      <td scope="col" className="px-6 py-3">
                        Role
                      </td>
                      <td scope="col" className="px-6 py-3">
                        Description
                      </td>
                      <td scope="col" className="px-6 py-3">
                        Status
                      </td>
                      <td scope="col" className="px-6 py-3"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-[5rem]">
                      <td className="px-6 py-3">Admin</td>
                      <td className="px-6 py-3 text-gray-500">
                        Can approve accounts, enrol teachers and students into
                        courses, approve the pending grades for courses and set
                        it to final, add more courses, and change privileges of
                        users that are not admin. Faculty
                      </td>
                      <td className="px-6 py-3">
                        <input
                          onChange={handleCheckboxChange}
                          checked={roles.admin.active}
                          name="admin"
                          type="checkbox"
                          className="m-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-3 text-red-500">
                        <button
                          className="underline"
                          onClick={() =>
                            handleClearRole("rol_SoW0bAKj2EFJjq9p", "admin")
                          }
                        >
                          Clear Records
                        </button>
                      </td>
                    </tr>
                    <tr className="h-[5rem] items-center">
                      <td className="px-6 py-3">Faculty</td>
                      <td className="px-6 py-3 text-gray-500">
                        Can view their courses that they have and are currently
                        handling, and can also edit the grade of their students
                        while the course is still not closed.
                      </td>
                      <td className="px-6 py-3">
                        <input
                          onChange={handleCheckboxChange}
                          checked={roles.faculty.active}
                          name="faculty"
                          type="checkbox"
                          className="m-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-3 text-red-500 underline">
                        <button
                          className="underline"
                          onClick={() =>
                            handleClearRole("rol_BSKVuiyht3oW58My", "faculty")
                          }
                        >
                          Clear Records
                        </button>
                      </td>
                    </tr>
                    <tr className="h-[5rem]">
                      <td className="px-6 py-3">Student</td>
                      <td className="px-6 py-3 text-gray-500">
                        Able to view their grades and their respective course
                        announcements.
                      </td>
                      <td className="px-6 py-3">
                        <input
                          onChange={handleCheckboxChange}
                          checked={roles.student.active}
                          name="student"
                          type="checkbox"
                          className="m-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </td>
                      <td className="px-6 py-3 text-red-500 underline">
                        <button
                          className="underline"
                          onClick={() =>
                            handleClearRole("rol_O4q4clcTvOeed7q6", "student")
                          }
                        >
                          Clear Records
                        </button>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsPage;
