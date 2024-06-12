import toast from 'react-hot-toast';

import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';



const PaymentPage = () => {
    const { user } = useContext(AuthContext)
    const userEmail = user?.email;
    console.log(userEmail)
    
    
    const handleSubmit = async () => {
    
        // click on this button will add user email to participants array in the contest
        const { data } = await axios.post(`/join-contest/${userEmail}`, { email: userEmail });
        console.log(data)
        toast.success('Payment successful');
    };
    return (
        <div className='w-11/12 mx-auto max-w-7xl container space-y-7'>
            <h1 className='md:text-4xl text-2xl text-center'>Pay here</h1>
            <form onSubmit={handleSubmit} className='bg-base-300 p-5 rounded-2xl'>
                <div className='flex items-center justify-center my-8'>
                    <button className='btn glass px-10 rounded-full' type="submit">
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentPage;
