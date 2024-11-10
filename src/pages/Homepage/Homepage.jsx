import React, { useRef, useState } from "react"
import { Outlet, NavLink } from "react-router-dom";

const Homepage = (props) => {
  const pageRef = useRef(null)

  return (
    <div className="bg-gray-50 flex-1 h-full max-h-full w-full grid grid-cols-[310px_1fr]">
      <div className="bg-inherit h-full w-full flex flex-col py-[1rem] px-[2rem]">
        <div className="bg-inherit h-fit text-black flex flex-col">
          <p className="font-bold mb-[0.5rem]">Main</p>
          <div className="ml-[0.25rem] flex flex-col">
          <NavLink to="dashpanel" className={({isActive, isPending}) => 
          isActive ? "text-blue-400 border-l-[1px] border-blue-400" : 'text-gray-800 border-l-[1px] border-gray-300'
        }
        >
          <p className={`h-[2.5rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50`}>Homepage</p>
          </NavLink>
          <NavLink to="gradespanel" className={({isActive, isPending}) => 
          isActive ? "text-blue-400 border-l-[1px] border-blue-400" : 'text-gray-800 border-l-[1px] border-gray-300'
        }
        >
          <p className="h-[2.5rem] flex items-center justify-start pl-[0.75rem] hover:bg-blue-50">Grades</p>
          </NavLink>
          </div>
        </div>
      </div>
      <div className="bg-inherit p-2 h-full max-h-full overflow-hidden">
        <div className="bg-white h-full w-full border-slate-300 rounded-xl border-[1px]">
          <Outlet />
        </div>
      </div>

    </div >
  )
}

export default Homepage;
