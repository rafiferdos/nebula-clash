import { BsFingerprint } from 'react-icons/bs'
import { GrUserAdmin } from 'react-icons/gr'
import { useContext, useState } from 'react'
import MenuItem from './/MenuItem'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosSecure from '../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useRole from '../hooks/useRols'

const UserMenu = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)
  const [role] = useRole()
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const modalHandler = async () => {
    console.log('I want to be a host')
    try {
      const currentUser = {
        email: user?.email,
        role: 'guest',
        status: 'Requested',
      }
      const { data } = await axiosSecure.put(`/save-users`, currentUser)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation')
      } else {
        toast.success('Please!, Wait for admin approval')
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      closeModal()
    }
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
          onClick={() => setIsModalOpen(true)}
          className='flex items-center px-4 py-2 mt-5 rounded-full hover:bg-base-300/50  transition-colors duration-300 transform cursor-pointer'
        >
          <GrUserAdmin className='w-5 h-5' />

          <span className='mx-4 font-medium'>Become A Creator</span>
        </div>
      )}
      {/* Modal */}
      {/* <HostModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      /> */}
    </>
  )
}

export default UserMenu