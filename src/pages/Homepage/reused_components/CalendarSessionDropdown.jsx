import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getCalendarSessions } from "/src/api/sql_api";
import SemesterRowForm from "./SemesterRowForm";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Collapsible from "@radix-ui/react-collapsible";
import PlusIcon from "/src/assets/plus.svg?react";
import MenuIcon from "/src/assets/menutwo.svg?react";
import clsx from "clsx";
import BetterDropDown from "./BetterDropDown";

const CalendarSessionDropdown = () => {
  const [calendarSessions, setCalendarSessions] = useState([]);
  const [calendarSessionFormBooleans, setCalendarSessionFormBooleans] =
    useState({});
  const { getAccessTokenSilently } = useAuth0();

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
    <>
      <BetterDropDown
        labelStyles={"text-sm"}
        label={"Manage Calendar Sessions"}
      >
        <span className="px-[0.8rem] py-[0.3rem] border border-b-1 border-solid w-full">
          Editing Menu
        </span>
        {calendarSessions.map((session, index) => {
          // console.log(session);
          let isOpen = false;
          return (
            <div
              className="w-full h-fit flex items-center justify-start px-[0.8rem] py-[0.3rem]"
              onClick={(e) => {
                e.preventDefault();
              }}
              key={session.academic_year + index}
            >
              <BetterDropDown
                label={
                  <span>
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
      </BetterDropDown>
    </>
  );
};

export default CalendarSessionDropdown;
