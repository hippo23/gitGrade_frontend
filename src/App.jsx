import { useEffect, useLayoutEffect, useState } from "react";
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
} from "@auth0/auth0-react";
import Homepage from "./pages/Homepage/Homepage";
import DashPanel from "./pages/Homepage/components/Dashboard/DashPanel";
import GradesPanel from "./pages/Homepage/components/Grades/GradesPanel";
import HRPanel from "./pages/Homepage/components/HRPage/HRPanel";
import TeacherCoursesPanel from "./pages/Homepage/components/CoursePage/CoursesPanel";
import OrganizationCoursesPanel from "./pages/Homepage/components/OrganizationCoursePage/OrganizationCoursesPanel";
import CourseSection from "./pages/Homepage/components/OrganizationCoursePage/CourseSection";
import AccountRequestsPage from "./pages/Homepage/components/Administrative/AccountRequestsPage";
import InfosheetContainer from "./pages/Homepage/components/InfosheetPage/InfosheetContainer";
import NotApprovedPage from "./pages/Homepage/components/Errors/NotApproved";
import UserDetailsPage from "./pages/Homepage/components/Administrative/UserInfoPage";
import UnauthorizedPage from "./pages/Homepage/components/Errors/Unauthorized";
import CourseSectionDetails from "./pages/Homepage/components/OrganizationCoursePage/CourseSectionGradesDetails";
import CurriculumChecklist from "./pages/Homepage/components/CurriculumChecklist/CurriculumChecklist";

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
        audience: import.meta.env.VITE_REACT_APP_DATABASE_API_AUDIENCE,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <Outlet />
    </Auth0Provider>
  );
};

const ProtectedRoute = ({ requiredRoles = [] }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const { getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    (async () => {
      const token = await getIdTokenClaims();
      const roles = token["https://stcf.com/roles"];
      const hasRole =
        requiredRoles.length === 0 ||
        roles.some((role) => requiredRoles.includes(role.toLowerCase()));

      if (!hasRole) {
        navigate("/errors/unauthorized");
      } else {
        setIsVerifying(false);
      }
    })();
  }, []);

  return isVerifying ? (
    <div className="h-[100vh] w-[100vw] fixed left-0 top-0 flex items-center justify-center z-[30] bg-white">
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <Outlet />
  );
};

const routerElements = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Auth0ProviderLayout />}>
      <Route path="/" element={<Homepage />}>
        <Route path="dashpanel" element={<DashPanel />}></Route>
        <Route
          path="student"
          element=<ProtectedRoute requiredRoles={["student"]} />
        >
          <Route path="gradespanel" element={<GradesPanel />}></Route>
          <Route path="curriculum_checklist" element={<CurriculumChecklist />}></Route>
        </Route>
        <Route
          path="/faculty"
          element=<ProtectedRoute requiredRoles={["faculty"]} />
        >
          <Route
            path="/faculty/teachercoursepanel"
            element={<TeacherCoursesPanel />}
          />
        </Route>
        <Route
          path="admin"
          element=<ProtectedRoute requiredRoles={["admin"]} />
        >
          <Route
            path="organizationcoursespanel"
            element={<OrganizationCoursesPanel />}
          />
          <Route
            path="organizationcoursespanel/:courseId"
            element={<CourseSection />}
          />
          <Route
            path="organizationcoursespanel/:courseId/:courseSectionId"
            element={<CourseSectionDetails />}
          />
          <Route path="hrpanel" element={<HRPanel />}></Route>
          <Route path="accounts" element={<AccountRequestsPage />} />
          <Route path="accounts/users/:userId" element={<UserDetailsPage />} />
        </Route>
      </Route>
      <Route path="/infosheet" element={<InfosheetContainer />} />
      <Route path="/errors">
        <Route path="/errors/notapproved" element={<NotApprovedPage />} />
        <Route path="/errors/unauthorized" element={<UnauthorizedPage />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={routerElements} />;
}

export default App;
