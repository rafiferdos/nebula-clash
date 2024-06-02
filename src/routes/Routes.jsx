import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home/Home"
import Main from "../layouts/Main"
import Register from "../pages/Authentication/Register"
import Login from "../pages/Authentication/Login"
import ContactUs from "../pages/ContactUs"
import ErrorPage from "../pages/ErrorPage"


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
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/contact_us',
                element: <ContactUs />
            }
        ]
    }
])

export default router