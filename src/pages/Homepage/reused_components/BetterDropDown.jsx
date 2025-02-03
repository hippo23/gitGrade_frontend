import React, { useState } from "react";
import clsx from "clsx";
import SemesterRowForm from "./SemesterRowForm";
const BetterDropDown = ({ label, labelStyles, children }) => {
  const [col, setCol] = useState(false);
  return (
    <div className="w-fit">
      <button
        onClick={() => {
          setCol(!col);
          console.log(col);
        }}
        className={clsx(
          "hover:bg-slate-100 py-1 px-2 transition-all duration-300 ease-out rounded-md outline-none border-none bg-transparent font-body w-full text-left",
          labelStyles,
        )}
      >
        {label}
      </button>
      <div
        className={clsx(
          "transition-all duration-300 ease-out w-full overflow-clip grid grid-rows-[0fr]",
          col && "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
};
export default BetterDropDown;
