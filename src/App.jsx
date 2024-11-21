import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import {
  Auth0Provider,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import Homepage from "./pages/Homepage/Homepage";
import DashPanel from "./pages/Homepage/components/Dashboard/DashPanel";
import GradesPanel from "./pages/Homepage/components/Grades/GradesPanel";
import HRPanel from "./pages/Homepage/components/HRPage/HRPanel";
import TeacherCoursesPanel from "./pages/Homepage/components/CoursePage/CoursesPanel";
import OrganizationCoursesPanel from "./pages/Homepage/components/OrganizationCoursePage/OrganizationCoursesPanel";
import AccountRequestsPage from "./pages/Homepage/components/Administrative/AccountRequestsPage";

const Auth0ProviderLayout = () => {
  // customize redirect callback functoin for react router
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider
      domain="dev-uslaj1b5ati50067.us.auth0.com"
      clientId="Q25nOCZ7H6gRYszHdkObv3qb2FjuMMNI"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <Outlet />
    </Auth0Provider>
  );
};

const routerElements = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Auth0ProviderLayout />}>
      <Route path="/" element={<Homepage />}>
        <Route path="dashpanel" element={<DashPanel />}></Route>
        <Route path="gradespanel" element={<GradesPanel />}></Route>
        <Route
          path="teachercoursepanel"
          element={<TeacherCoursesPanel />}
        ></Route>
        <Route path="hrpanel" element={<HRPanel />}></Route>
        <Route
          path="organizationcoursespanel"
          element={<OrganizationCoursesPanel />}
        ></Route>
        <Route path="accountrequests" element={<AccountRequestsPage />}></Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={routerElements} />;
}

export default App;
