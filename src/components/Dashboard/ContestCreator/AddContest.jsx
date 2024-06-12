import { useContext } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";


const AddContest = () => {

    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            deadline: new Date(),
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async formattedData => {
            const { data } = await axiosSecure.post('/create-contest', formattedData);
            return data;
        },
        onSuccess: () => {
            toast.success('Contest created successfully')
            navigate('/dashboard/my_created_contests')
        }
    })


    const onSubmit = (data) => {
        const deadlineDate = new Date(data.deadline);
        const formattedDeadline = `${deadlineDate.getFullYear()}-${('0' + (deadlineDate.getMonth() + 1)).slice(-2)}-${('0' + deadlineDate.getDate()).slice(-2)}T${('0' + deadlineDate.getHours()).slice(-2)}:${('0' + deadlineDate.getMinutes()).slice(-2)}:${('0' + deadlineDate.getSeconds()).slice(-2)}Z`;

        const creator = {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
        }

        const formattedData = {
            ...data,
            deadline: formattedDeadline,
            status: 'pending',
            participants: [],
            creator,
        }
        // send data to the server
        mutateAsync(formattedData)

        reset()
    };

    return (
        <Fade>
            <div className="flex items-center justify-center h-screen my-8">
            <div className="bg-base-200/60 p-4 py-10 md:p-16 rounded-3xl">
                <h1 className="text-center text-4xl mb-5 font-nunito font-extrabold">
                    Add Contest
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full lg:w-[600px]">
                    <input {...register("name", { required: true })} type="text" placeholder="Contest Name" className="input input-bordered w-full max-w-xs lg:max-w-xl md:max-w-md" />
                    {errors.name && <span className='text-error'>This field is required</span>}
                    <div>
                        <div>
                        </div>
                        <input {...register("image", { required: true })} placeholder="Insert Image URL" type="text" className="input input-bordered w-full max-w-xs lg:max-w-xl md:max-w-md" />
                        {errors.image && <span className='text-error'>This field is required</span>}
                    </div>
                    <div>
                        <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full bg-base-100/30 max-w-xs lg:max-w-xl md:max-w-md" placeholder="Description"></textarea>
                        {errors.description && <span className='text-error'>This field is required</span>}
                    </div>
                    <div>
                        <input {...register("registrationPrice", { required: true })} type="text" placeholder="Contest Price" className="input w-full max-w-xs lg:max-w-xl md:max-w-md" />
                        {errors.registrationPrice && <span className='text-error'>This field is required</span>}
                    </div>
                    <div>
                        <input {...register("prize", { required: true })} type="text" placeholder="Price Money" className="input w-full max-w-xs lg:max-w-xl md:max-w-md" />
                        {errors.prize && <span className='text-error'>This field is required</span>}
                    </div>
                    <div>
                        <textarea {...register("task", { required: true })} type="text" placeholder="Task Submission (text)" className="textarea textarea-bordered w-full max-w-xs lg:max-w-xl md:max-w-md" />
                        {errors.task && <span className='text-error'>This field is required</span>}
                    </div>
                    <div>
                        <select {...register("tags", { required: true })} className="select w-full max-w-xs lg:max-w-xl md:max-w-md">4
                            {errors.tags && <span className='text-error'>This field is required</span>}
                            <option disabled selected>Choose contest tags</option>
                            <option>Image Design Contests</option>
                            <option>Article Writing</option>
                            <option>Marketing Strategy</option>
                            <option>Digital Advertisement Contests</option>
                            <option>Gaming Review</option>
                            <option>Book Review</option>
                            <option>Business Idea Concerts</option>
                            <option>Movie Review</option>
                        </select>
                    </div>
                    <h3>Choose Deadline</h3>
                    <div className="text-center block">
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            name="deadline"
                            render={({ field }) => (
                                <ReactDatePicker
                                    selected={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    className="p-5 rounded-3xl cursor-pointer"
                                    dateFormat="dd/MM/yyyy"
                                />
                            )}
                        />
                        {errors.deadline && <span className='text-error'>This field is required</span>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="btn glass lg:btn-lg md:btn-md btn-sm btn-wide rounded-full">Create</button>
                    </div>
                </form>
            </div>
        </div >
        </Fade>
    );
};

export default AddContest;