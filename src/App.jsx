import { createBrowserRouter, RouterProvider, Route, Link } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import DashPanel from './pages/Homepage/components/DashPanel'
import GradesPanel from './pages/Homepage/components/GradesPanel'

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
