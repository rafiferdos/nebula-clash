import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home/Home"
import Main from "../layouts/Main"


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
])

export default router