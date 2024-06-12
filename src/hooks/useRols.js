import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'

const useRole = () => {
    const { user, loading } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: role = '', isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data.role
        },
    })

    //   Fetch user info using logged in user email

    return [role, isLoading]
}

export default useRole