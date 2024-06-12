import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage_users' />
      <MenuItem icon={FaUserCog} label='Manage Contests' address='manage_contests' />
    </>
  )
}

export default AdminMenu