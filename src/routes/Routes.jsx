import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home/Home"
import Main from "../layouts/Main"
import Register from "../pages/Authentication/Register"
import Login from "../pages/Authentication/Login"
import ContactUs from "../pages/ContactUs"
import ErrorPage from "../pages/ErrorPage"
import AllContests from "../pages/AllContests"
import ContestDetails from "../pages/ContestDetails"
import DashboardLayout from "../layouts/DashboardLayout"
import PrivateRoute from "../components/PrivateRoute"
import Profile from "../components/Dashboard/Common/Profile"
import AddContest from "../components/Dashboard/ContestCreator/AddContest"
import MyCreatedContest from "../components/Dashboard/ContestCreator/MyCreatedContest"
import DashboardWelcome from "../components/Dashboard/Common/DashboardWelcome"
import ContestSubmitted from "../components/Dashboard/ContestCreator/ContestSubmitted"
import ManageUsers from "../pages/ManageUsers"
import ManageContests from "../pages/ManageContests"
import ParticipatedContest from "../components/ParticipatedContest"


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/contact_us',
                element: <ContactUs />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/all_contests',
                element: <AllContests />
            },
            {
                path: '/top_contests',
                // element: <TopContests />
            },
            {
                path: '/contest-details/:id',
                element: <ContestDetails />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <DashboardWelcome />
            },
            {
                path: 'add_contest',
                element: <AddContest />
            },
            {
                path: 'my_created_contests',
                element: <MyCreatedContest />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'contest_submitted',
                element: <ContestSubmitted />
            },
            {
                path: 'manage_users',
                element: <ManageUsers />
            },
            {
                path: 'manage_contests',
                element: <ManageContests />
            },
            {
                path: 'my_participated_contests',
                element: <ParticipatedContest />
            }
        ]
    },

])

export default router