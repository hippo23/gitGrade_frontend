import { Outlet } from "react-router-dom";

const AuthenticationPage = (props) => {
  return (
    <div className="bg-gradient-to-r from-green-200/40 to-pink-200/40 w-full h-full flex items-center justify-center">
        <Outlet />
    </div>
  );
};

export default AuthenticationPage;
