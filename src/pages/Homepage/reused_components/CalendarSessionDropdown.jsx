import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCalendarSessions } from "/src/api/sql_api";
import SemesterRowForm from "./SemesterRowForm";
import BetterDropDown from "./BetterDropDown";
import clsx from "clsx";

const CalendarSessionDropdown = () => {
  const [calendarSessions, setCalendarSessions] = useState([]);
  const [calendarSessionFormBooleans, setCalendarSessionFormBooleans] =
    useState({});
  const { getAccessTokenSilently } = useAuth0();

  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();

      const calendar_data = await getCalendarSessions(token);
      const booleans = {};
      calendar_data.map((session) => {
        booleans[session.organizationcalendarid] = false;
      });
      setCalendarSessionFormBooleans(booleans);
      setCalendarSessions(calendar_data);
    })();
  }, [getAccessTokenSilently]);

  return (
    <div className="relative flex flex-col">
      <button
        className="hover:bg-slate-100 text-xs py-1 px-2 transition-all duration-300 ease-out rounded-md outline-none border-none bg-transparent font-body text-nowrap text-left"
        onClick={() => setDropdownOpen((prev) => !prev)}>
        Manage Calendar Sessions
      </button>
      <div className={clsx("top-[1.5rem] z-[999999] w-[300%] border border-solid border-1 shadow-md shadow-gray-300 rounded-md left-0 absolute bg-white", !dropdownOpen && "hidden")}>
        <div className="text-xs px-2 py-1 border-t-0 border-x-0 border border-b-1 border-solid w-full">
          Editing Menu
        </div>
        {calendarSessions.map((session, index) => {
          return (
            <div
              className="w-full h-fit flex items-center justify-start px-2 py-1"
              onClick={(e) => {
                e.preventDefault();
              }}
              key={session.academic_year + index}
            >
              <BetterDropDown
                label={
                  <span className="text-xs">
                    AY{" "}
                    <span className="font-semibold">
                      {session.academic_year}
                    </span>
                  </span>
                }
              >
                <SemesterRowForm />
              </BetterDropDown>
            </div>
          );
        })}

        <div
          className="w-full h-fit flex items-center justify-start px-[0.8rem] py-[0.3rem]"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <button
            type="button"
            className="ml-auto w-[7rem] rounded-md bg-white text-black text-[0.8rem] py-[0.3rem] px-[0.3rem] border-[1px]"
            onClick={() => {
              setDropdownOpen(false)
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="ml-[0.5rem] min-w-[7rem] rounded-md bg-black text-white text-[0.8rem] py-[0.3rem] px-[0.3rem]"
          >
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
};

export default CalendarSessionDropdown;
