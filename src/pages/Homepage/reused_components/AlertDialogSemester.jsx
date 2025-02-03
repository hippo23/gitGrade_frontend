import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useAuth0 } from "@auth0/auth0-react";
import { getCalendarSessions } from "/src/api/sql_api";

const AlertSemesterDialog = ({
  open,
  setOpen,
  onSubmit,
  onCancel,
  handleSubmit,
  register,
}) => {
  const [calendarSessions, setCalendarSessions] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      const data = await getCalendarSessions(token);
      console.log(data);
      setCalendarSessions(data);
    })();
  }, [getAccessTokenSilently]);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Content className="flex items-center justify-center bg-white p-[1rem] w-[25rem] h-fit z-30 absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <div className="flex gap-[1rem] flex-col">
            {createPortal(
              <div className="h-[100vh] w-[100vw] bg-black absolute z-20 opacity-70"></div>,
              document.getElementById("appContainer"),
            )}
            <header>
              <Dialog.Title className="font-semibold">
                Create a Session
              </Dialog.Title>
              <Dialog.Description className="medium text-[0.9rem] text-gray-600">
                Enter the name for the calendar session you want to create.
              </Dialog.Description>
            </header>
            <form
              className="flex flex-col gap-[1rem]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col">
                <label className="text-[0.85rem]">Calendar Session</label>
                <select
                  className="p-[0.2rem] rounded-md border-[1px] border-gray-200"
                  {...register("calendar_session", {
                    required: true,
                  })}
                >
                  {calendarSessions.map((calendar_session, index) => {
                    return (
                      <option
                        key={`${calendar_session}+${index}`}
                        value={calendar_session.organizationcalendarid}
                      >
                        {calendar_session.academic_year}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[0.85rem]">Semester Type</label>
                <select
                  className="p-[0.2rem] rounded-md border-[1px] border-gray-200 bg-white"
                  {...register("semester_type", {
                    required: true,
                  })}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[0.85rem]">Start Date</label>
                <input
                  className="p-[0.2rem] rounded-md border-[1px] border-gray-200"
                  type="date"
                  {...register("startdate", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[0.85rem]">End Date</label>
                <input
                  className="p-[0.2rem] rounded-md border-[1px] border-gray-200"
                  type="date"
                  {...register("enddate", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex gap-[1rem]">
                <button
                  type="button"
                  className="flex-1 rounded-md bg-white text-black text-[0.9rem] py-[0.3rem] border-blak border-[1px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel();
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-black text-white text-[0.9rem] py-[0.3rem]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const AlertCalendarDialog = ({
  open,
  setOpen,
  register,
  onSubmit,
  handleSubmit,
  onCancel,
}) => {
  return (
    open && (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Content className="flex items-center justify-center bg-white p-[1rem] w-[25rem] h-fit z-30 absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="flex gap-[1rem] flex-col">
              {createPortal(
                <div className="h-[100vh] w-[100vw] bg-black absolute z-20 opacity-70"></div>,
                document.getElementById("appContainer"),
              )}
              <header>
                <Dialog.Title className="font-semibold">
                  Create a Session
                </Dialog.Title>
                <Dialog.Description className="medium text-[0.9rem] text-gray-600">
                  Enter the name for the calendar session you want to create.
                </Dialog.Description>
              </header>
              <form
                className="flex flex-col gap-[1rem]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="p-[0.2rem] rounded-md border-[1px] border-gray-200"
                  type="text"
                  {...register("name", {
                    required: true,
                  })}
                />
                <div className="w-full flex gap-[1rem]">
                  <button
                    type="button"
                    className="flex-1 rounded-md bg-white text-black text-[0.9rem] py-[0.3rem] border-blak border-[1px]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancel();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-black text-white text-[0.9rem] py-[0.3rem]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  );
};

const useSemesterPrompt = () => {
  const [open, setOpen] = useState(false);
  const onCloseRef = useRef();
  const onSubmit = useCallback(
    (values) => {
      setOpen(false);
      if (onCloseRef.current) {
        onCloseRef.current(values);
      }
    },
    [setOpen, onCloseRef],
  );

  const onCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log(open);
  }, [open]);

  const { handleSubmit, register } = useForm();

  return {
    open: async () => {
      setOpen(true);
      return new Promise((resolve) => {
        onCloseRef.current = (values) => {
          setOpen(false);
          resolve(values);
        };
      });
    },
    elem: (
      <AlertSemesterDialog
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
        onCancel={onCancel}
        handleSubmit={handleSubmit}
        register={register}
      />
    ),
  };
};

const useCalendarSessionPrompt = () => {
  const [open, setOpen] = useState(false);
  const onCloseRef = useRef();
  const onSubmit = useCallback(
    (values) => {
      setOpen(false);
      if (onCloseRef.current) {
        onCloseRef.current(values);
      }
    },
    [setOpen, onCloseRef],
  );

  const onCancel = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();

  return {
    open: async () => {
      setOpen(true);
      return new Promise((resolve) => {
        onCloseRef.current = (values) => {
          resolve(values);
        };
      });
    },
    elem: (
      <AlertCalendarDialog
        open={open}
        setOpen={setOpen}
        onCancel={onCancel}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
      />
    ),
  };
};

export { useSemesterPrompt, useCalendarSessionPrompt };
