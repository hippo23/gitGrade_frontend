import { Link } from "react-router-dom";

const TableCellLink = ({ url, text }) => {
  return (
    <Link className="text-blue-600 underline" to={url}>
      {text}
    </Link>
  );
};
