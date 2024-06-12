import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar />
            <div className="flex-1">
                <div className="md:pl-52 px-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;