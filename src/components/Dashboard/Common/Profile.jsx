import { useContext } from "react"
import { AuthContext } from "../../../provider/AuthProvider"
import useRole from "../../../hooks/useRols"
import { HashLoader } from "react-spinners"
import { Fade } from "react-awesome-reveal"
import toast from "react-hot-toast"
import useAxiosSecure from "../../../hooks/useAxiosSecure"

const Profile = () => {
    const { user, loading } = useContext(AuthContext)
    const [role, isLoading] = useRole()
    const blankUser = 'https://img.freepik.com/premium-photo/default-male-user-icon-blank-profile-image-green-background-profile-picture-icon_962764-98397.jpg'

    const axiosSecure = useAxiosSecure()
    const userEmail = user?.email
    const handleStatus = async () => {
        try {
            const { data } = await axiosSecure.put(`/update-user-role/${userEmail}`, {
                role: 'requested'
            })
            toast.success('Role requested successfully!')
        } catch (err) {
            console.log(err)
        }
    }
    if (isLoading || loading) return <>
        <div className='flex justify-center items-center h-screen'>
            <HashLoader color='#00ffff' />
        </div>
    </>


    return (
        <Fade direction="up">
            <div className='flex justify-center items-center h-screen'>
                <div className='bg-base-300/70 shadow-2xl rounded-2xl w-11/12 md:w-3/5 max-w-lg'>
                    <img
                        alt='profile'
                        src='https://i.ibb.co/74PXc1h/userbanner2.jpg'
                        className='w-full mb-4 rounded-t-lg h-auto'
                    />
                    <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user?.photoURL || blankUser}
                                className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-cyan-400'
                            />
                        </a>

                        <p className='p-2 px-4 my-4 text-xs bg-cyan-600 text-white rounded-full font-nunito font-extrabold md:text-lg uppercase'>
                            {role}
                        </p>
                        <p className='mt-2 lg:text-xl text-sm font-medium'>
                            User Id: {user?.uid}
                        </p>
                        <div className='w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-wrap items-center justify-around text-sm  '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold'>
                                        {user?.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold'>{user?.email}</span>
                                </p>

                                {/* <div>
                                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                    Update Profile
                                </button>
                                <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                    Change Password
                                </button>
                            </div> */}
                            </div>
                            <p className='text-sm text-center my-4'>
                                <span className='font-bold'>Joined on:</span> {new Date(user.metadata.creationTime).toDateString()}
                            </p>
                            <hr className="border-base-content my-6" />
                            <div className="flex items-center justify-center gap-3">
                                <p>Apply for: </p>
                                <select onChange={handleStatus} className="select w-full max-w-xs bg-base-100/40">
                                    <option disabled selected>Select Role</option>
                                    <option>User</option>
                                    <option>Contest Creator</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    )
}

export default Profile