import { NavLink } from "react-router-dom";

const SidebarNavlink = ({ label, destination, svg }) => {
  return (
    <NavLink
      to={destination}
      className={({ isActive }) =>
        isActive
          ? "text-blue-400 border-l-[1px] border-blue-400"
          : "text-white border-l-[1px] border-gray-300"
      }
    >
      <p
        className={`h-[2.5rem] text-[0.8rem] flex items-center justify-start pl-[0.75rem] hover:bg-gray-900`}
      >
        <span>
          {svg}
        </span>
        {label}
      </p>
    </NavLink>

  )
}

export default SidebarNavlink
