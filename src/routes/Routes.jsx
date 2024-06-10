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
                
            }
        ]
    },

])

export default router