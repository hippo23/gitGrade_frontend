import { useAuth0 } from "@auth0/auth0-react";

const GradesPanel = (props) => {


  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr]">
      <div className="w-full h-[10rem] px-[2rem] flex items-center justify-around">
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
      <div className="p-[2rem] h-[100%] w-full overflow-y-scroll">
        <table className="margin-auto h-full overflow-y-scroll max-h-full w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[10rem] bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="h-[10rem] bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="h-[10rem] bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="h-[10rem] bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="h-[10rem] bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradesPanel;
