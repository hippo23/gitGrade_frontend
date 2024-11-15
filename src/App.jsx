import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import DashPanel from './pages/Homepage/components/DashPanel'
import GradesPanel from './pages/Homepage/components/GradesPanel'
import HRPanel from './pages/Homepage/components/HRPanel'
import TeacherCoursesPanel from './pages/Homepage/components/CoursesPanel'
import OrganizationCoursesPanel from './pages/Homepage/components/OrganizationCoursesPanel'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Homepage />
    ),
    children: [
      {
        path: "/dashpanel",
        element: <DashPanel />
      },
      {
        path: "/gradespanel",
        element: <GradesPanel />
      },
      {
        path: "/teachercoursepanel",
        element: <TeacherCoursesPanel />
      },
      {
        path: "/hrpanel",
        element: <HRPanel />
      },
      {
        path: "/organizationcoursespanel",
        element: <OrganizationCoursesPanel />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
