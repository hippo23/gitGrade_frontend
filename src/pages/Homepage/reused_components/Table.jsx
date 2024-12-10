import React from "react";

const Table = ({ headers, rows, columnAttr, rowHeight }) => {
  return (
    <table className="table-auto m-auto h-full overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="">
        <tr className="h-[1.5rem] bg-white border-y-[1px] border-slate-150">
          {headers.map((header, index) => {
            return (
              <th className="px-6 py-3" key={`${index}+${header.value}`}>
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="overflow-y-auto">
        {rows.map((row, index_row) => {
          return (
            <tr className={`${rowHeight}`} key={`${index_row}`}>
              {columnAttr.map((column, index) => {
                return (
                  <td className="px-6 py-3" key={`${index}+${column.id}`}>
                    {column.render(column.id, row)}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <tr></tr>
      </tbody>
    </table>
  );
};

export default Table;
