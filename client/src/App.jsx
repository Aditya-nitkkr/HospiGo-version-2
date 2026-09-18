import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { AppLayout } from "./Layouts/AppLayout";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { ErrorPage } from "./components/ErrorPage";
import NearbyHospitals from "./pages/NearbyHospital";
import { HospitalDetails } from "./pages/HospitalDetails";
import { Profile } from "./UI/Profile";
import { PrivateRoute } from "./Layouts/PrivateRoute";
import { PublicRoute } from "./Layouts/PublicRoute";
import { OAuthSuccess } from "./context/oauth-google";
import { HospitalRoute } from "./Layouts/HospitalRoute";

const router = createBrowserRouter([

  //Public Route ->accessible to all the user
  {
    element: <PublicRoute />,
   errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },


    ]
  },

  //Private Route ->accessible only to the authorized user
  {
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profile",
        element: <Profile />,

      }
    ]

  },
  {
    element: <HospitalRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/hospital/:id",
        element: <HospitalDetails />
      },
    ]
  },
  {
    path: "/oauth-google",
    element: <OAuthSuccess />

  },

  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/nearHospital",
        element: <NearbyHospitals />
      },

    ],
  }
])


const App = () => {
  return (
    <div className="min-h-screen  p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-[1500px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-3rem)]">

        <RouterProvider router={router} />

      </div>
    </div>
  );
}
export default App;