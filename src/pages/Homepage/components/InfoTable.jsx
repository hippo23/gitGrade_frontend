const InfoTable = (props) => {
  return (
    <div class="h-[90%] w-[90%] overflow-x-auto border-[1px] border-gray-300 sm:rounded-lg">
      <table class="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
              Name
            </th>
            <td class="px-6 py-4">
              Magleo, Simon Benedict A.
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
              Birthday
            </th>
            <td class="px-6 py-4">
              July 23, 2005
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
              Organizational Position
            </th>
            <td class="px-6 py-4">
              Faculty, Special Science III
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default InfoTable
