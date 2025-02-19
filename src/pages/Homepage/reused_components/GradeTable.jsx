import clsx from "clsx"

const GradeTable = ({ semester, academicYear, gradeData, width, height }) => {
  return (
    <>
      <div className={clsx('hover:shadow-md transition ease-in-out hover:cursor-pointer flex flex-col p-[1rem] bg-white border-[1px] gap-[1rem] border-gray-300 min-h-[20rem] rounded-md bg-gradient-to-b from-amber-50 from-10% to-white to-100%', typeof width !== undefined ? `w-[${width}]` : 'w-full', typeof height !== undefined ? `h-[${height}]` : 'h-full')}>
        <div className="w-full rounded-md p-[0.5rem]">
          <h1 className="font-semibold">AY {academicYear}</h1>
          <h2 className="text-[0.9rem]">Semester {semester}</h2>
        </div>
        <table className="text-sm w-full table-auto">
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
      </div >
    </>
  )
}
export default GradeTable
