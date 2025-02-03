import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { createPortal } from "react-dom";

const AlertBoxConfirm = ({ handleSubmitListener, warningText }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-red-600 underline">Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal container={document.getElementById("root")}>
        <AlertDialog.Overlay className="" />
        <AlertDialog.Content className="flex items-center justify-center bg-white p-[1rem] w-[25rem] h-fit z-30 absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
          <div>
            {createPortal(
              <div className="h-[100vh] w-[100vw] bg-black absolute z-20 opacity-70"></div>,
              document.getElementById("appContainer"),
            )}
            <AlertDialog.Title className="mb-[1rem] font-bold">
              Are you absolutely sure?
            </AlertDialog.Title>
            <AlertDialog.Description className="text-[0.9rem] text-gray-600">
              {warningText}
            </AlertDialog.Description>
            <div className="flex justify-end gap-[1rem] text-[0.8rem] mt-[1rem]">
              <AlertDialog.Cancel asChild>
                <button className="bg-inherit border-[1.5px] border-black rounded-md p-[0.5rem]">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={() => {
                    handleSubmitListener();
                  }}
                  className="bg-black text-white rounded-md p-[0.5rem]"
                >
                  Yes, delete account
                </button>
              </AlertDialog.Action>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default AlertBoxConfirm;
