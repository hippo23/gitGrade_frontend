import React, { useState } from "react";
import clsx from "clsx";
import chevron from "/src/assets/chevron.svg"
const BetterDropDown = ({ label, labelStyles, children, containerStyles }) => {
  const [col, setCol] = useState(false);
  return (
    <div className={clsx("w-fit", containerStyles)}>
      <button
        onClick={() => {
          setCol(!col);
          console.log(col);
        }}
        className={clsx(
          "hover:bg-slate-100 py-1 px-2 transition-all duration-300 ease-out rounded-md outline-none border-none font-body w-full text-left flex flex-row justify-between items-center",
          labelStyles,
        )}
      >
        {label}
        <img src={chevron} className={clsx("w-[14px] h-[14px] transition-all duration-300 ease-out", col && "rotate-90")} />
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
