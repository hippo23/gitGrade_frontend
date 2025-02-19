import GradeTable from "./../../reused_components/GradeTable";

const GradesPanel = (props) => {


  return (
    <div className="bg-gray-50 overflow-hidden h-full w-full grid grid-rows-[auto_1fr] px-[3rem] py-[2rem]">
      <div className="w-full h-[10rem] flex items-center justify-around">
        <div className="w-fit h-fit text-[2rem] justify-self-start">
          <h1 className="font-bold">Grades</h1>
          <p className="text-[1rem] text-gray-500">Magleo, Simon Benedict A.</p>
          <p className="text-[1rem] text-gray-500">2023-10907</p>
          <p className="text-[1rem] text-gray-500">BS Crimonology</p>
        </div>
        <div className="w-fit h-[5rem] ml-auto">
          <button
            type="button"
            class="border-[1px] border-gray-200 text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Year Level
          </button>
          <button
            type="button"
            class="text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Semester
          </button>
        </div>
      </div>
      <div className="max-h-[100%] overflow-y-auto">
        <div className="overflow-auto py-[1rem] h-fit w-full grid grid-rows-3 grid-cols-2 gap-[1rem]">
          <GradeTable semester={1} academicYear='2024-2025' height="32rem" />
          <GradeTable semester={1} academicYear='2024-2025' height="32rem" />
          <GradeTable semester={1} academicYear='2024-2025' height="32rem" />
          <GradeTable semester={1} academicYear='2024-2025' height="32rem" />
          <GradeTable semester={1} academicYear='2024-2025' height="32rem" />
          <GradeTable semester={1} academicYear='2024-2025' height="32rem" />
        </div>
        <div className="mb-[1rem] bg-gradient-to-b from-amber-50 from-10% to-white to-100% col-span-2 rounded-md border-[1px] border-gray-300 p-[1rem]">
          <div className="w-full rounded-md p-[0.5rem]">
            <h1 className="font-semibold">General Weighted Average</h1>
            <h2 className="text-[0.9rem]">All Semesters</h2>
          </div>
          <table className="h-fit text-sm w-full table-auto">
            <thead class="text-center">
              <tr className="border-b-[1px] border-gray-400">
                <th>Class Code</th>
                <th>Class Name</th>
                <th>Teacher/s</th>
                <th>Grade</th>
                <th>Date of Completion</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="border-b-[1px] border-gray-400">
                <td className="py-[0.5rem]">54513</td>
                <td className="py-[0.5rem]">CS 10 THY</td>
                <td className="py-[0.5rem]">Kevin Charles Atienza</td>
                <td className="py-[0.5rem]">3.00</td>
                <td className="py-[0.5rem]">---</td>
              </tr>
              <tr className="border-b-[1px] border-gray-400">
                <td className="py-[0.5rem]">54513</td>
                <td className="py-[0.5rem]">CS 10 THY</td>
                <td className="py-[0.5rem]">Kevin Charles Atienza</td>
                <td className="py-[0.5rem]">3.00</td>
                <td className="py-[0.5rem]">---</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-sky-200 w-full h-fit p-[2rem] border-[1px] border-blue-500">
          This module should not be used in place of the True Copy of Grades or any other official documents pertaining to the student's academic performance nor should it be regarded as an authoritative guide on the student's curriculum.

          The True Copy of Grades may be secured from the student's home college while other official documents on grades may also be secured from the Office of the University Registrar (OUR).

          For RGEP Subjects that fall into more than one domain (AH, MST, SSP), the student may choose which domain the subject taken will be credited to
        </div>
      </div>
    </div>
  );
};

export default GradesPanel;
