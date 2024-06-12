import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuItem = ({ label, address, icon: Icon }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors rounded-full duration-300 transform  hover:bg-base-300/50 ${isActive ? 'bg-base-300/40' : ''
                }`
            }
        >
            <Icon className='w-5 h-5' />
            <span className='mx-4 font-medium'>{label}</span>
        </NavLink>
    );
};

export default MenuItem;