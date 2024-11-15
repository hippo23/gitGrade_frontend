import { useState, useEffect } from "react";
import { getPersons } from "../../../api/sql_api";

const HRPanel = (props) => {
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([])

  useEffect(() => {
    (async () => {
      const res = await getPersons()
      setEmployees(res)
    })()
  }, [])

  return (
    <div className="h-full w-full bg-white overflow-hidden grid grid-rows-[0.1fr_0.07fr_1fr]">
      <div className="p-[1.3rem]">
        <h1 className="font-bold text-[1.7rem]">Employees 👱</h1>
      </div>
      <div className="border-y-[1px] border-slate-150 px-[1rem] flex items-center">
        <button className="ml-auto h-fit p-[1rem] min-w-[4rem] text-[0.75rem] mr-[0.5rem] flex">
          <span className="mr-[0.3rem]">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </span>
          Search
        </button>
        <button className="h-fit p-[1rem] min-w-[4rem] text-[0.75rem] mr-[0.5rem] flex">
          <span className="mr-[0.3rem]">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
            </svg>
          </span>
          Filter
        </button>
        <button className="shadow-md bg-red-500 h-fit px-[1rem] py-[0.4rem] min-w-[4rem] text-[0.75rem] mx-[0.5rem] hover:bg-red-600 flex items-center justify-center w-fit rounded-md">
          <span>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </span>
        </button>
      </div>
      <div className="h-[100%] w-full overflow-auto">
        <table className="table-auto m-auto h-full overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Profile Picture
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position/s
              </th>
              <th scope="col" className="px-6 py-3">
                Birthday
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              console.log(employee)
              return (
                <tr className="h-[1.5rem] bg-white border-y-[1px] border-slate-150">
                  <td className="px-6 py-3"></td>
                  <td className="px-6 py-3">{employee.lastname, employee.firstname}</td>
                  <td className="px-6 py-3">{employee.role_name}</td>
                  <td className="px-6 py-3">{employee.birthday}</td>
                </tr>
              )
            })}
            <tr className="bg-white border-b"></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRPanel;
