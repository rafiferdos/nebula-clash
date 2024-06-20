import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

const MyProfile = () => {

    const {updateUserProfile} = useContext(AuthContext)
    const [progress, setProgress] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            setProgress(50);
        }, 5000);
        return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before the timer fires
    }, []);

    const onSubmit = (data) => {
        try {
            updateUserProfile(data.name, data.photo)
        toast.success('Updated Successfully! Please Reload')
            }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex h-screen items-center flex-col gap-8 justify-center">
            <h1 className="text-3xl font-semibold ">My Winning Contests Percentage</h1>
            <div className="radial-progress border-4 border-primary" style={{ "--value": progress }} role="progressbar">{progress}%</div>
            {/* user information in a form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-96 bg-base-300/30 p-6 rounded-xl">
                <h1
                    className='text-2xl font-semibold text-center'

                >Update Profile</h1>
                <label htmlFor="name">New Name</label>
                <input className='input' {...register('name')} type="text" placeholder="Your Name" />
                <label htmlFor="email">Your PhotoURL</label>
                <input className='input' {...register('photo')} type="text" name="email" placeholder="URL" />
                <button type='submit' className="btn glass">Update Profile</button>
            </form>
        </div>
    );
};

export default MyProfile;