import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const CreatorMenu = () => {
    return (
        <>
            <MenuItem icon={BsFillHouseAddFill} label='Add Contest' address='add_contest' />
            <MenuItem icon={MdHomeWork} label='My Created Contests' address='my-my_created_contests' />
            <MenuItem icon={MdOutlineManageHistory} label='My Submitted Contests' address='contest_submitted'
            />
        </>
    )
}

export default CreatorMenu