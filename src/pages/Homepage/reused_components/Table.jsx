import React from "react";

const Table = ({ headers, rows, rowHeight }) => {
  return (
    <table className="table-auto m-auto h-full overflow-hidden w-full text-sm text-left rtl:text-right text-gray-500">
      <thead className="">
        <tr className="h-[1.5rem] bg-white border-y-[1px] border-slate-150">
          {headers.map((header, index) => {
            return <th key={`${index}+${header.value}`}>{header.value}</th>;
          })}
        </tr>
      </thead>
      <tbody className="overflow-y-auto">
        {rows.map((row) => {
          <tr className={`${rowHeight}`}>
            {row.map((item) => {
              return <td className="px-6 py-3">{item.value}</td>;
            })}
          </tr>;
        })}
        <tr></tr>
      </tbody>
    </table>
  );
};

export default Table;
