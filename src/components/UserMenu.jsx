import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { useContext, useState } from 'react'
import MenuItem from './/MenuItem'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosSecure from '../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useRole from '../hooks/useRols'
import { useQuery } from '@tanstack/react-query'

const UserMenu = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [role] = useRole()
    const userEmail = user?.email

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-users`)
            return data
        }
    })

    // find user by email and update the role to requested
    const handleCreatorStatus = async () => {
        try {
            const { data } = await axiosSecure.put(`/update-user-role/${userEmail}`, {
                role: 'requested'
            })
            toast.success('Role requested successfully!')
            refetch()
        } catch (err) {
            console.log(err)
        }
    }


    if (isLoading) {
        return (
            <div className="flex items-center h-screen justify-center">
                <div className="loading loading-infinity loading-lg text-accent"></div>
            </div>
        )
    }


    return (
        <>
            <MenuItem
                icon={BsFingerprint}
                label='My Participated Contests'
                address='my_participated_contests'
            />

            {role === 'user' && (
                <div
                    //   onClick={() => setIsModalOpen(true)}
                    className='flex items-center px-4 py-2 mt-5 rounded-full hover:bg-base-300/50  transition-colors duration-300 transform cursor-pointer'
                >
                    <GrUserAdmin className='w-5 h-5' />

                    <button onClick={() => handleCreatorStatus(user._id)} className='mx-4 font-medium'>Become A Creator</button>
                </div>
            )}
        </>
    )
}

export default UserMenu