import { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosCommon } from "../../../hooks/useAxiosCommon";
import { Fade } from "react-awesome-reveal";
import { LuPencil } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyCreatedContest = () => {

    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();

    const { user } = useContext(AuthContext);

    const userEmail = user?.email;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [registrationPrice, setRegistrationPrice] = useState('');
    const [prize, setPrize] = useState('');
    const [task, setTask] = useState('');
    const [tags, setTags] = useState('');

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm()

    const {
        data: contests = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['my-contests', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-contests/${user?.email}`)

            return data
        },
    })

    const { mutateAsync } = useMutation({
        mutationFn: async id => {
          const { data } = await axiosSecure.delete(`/delete-contest/${id}`)
          return data
        },
        onSuccess: data => {
          console.log(data)
          refetch()
          toast.success('Successfully deleted')
        },
      })
    
      //  Handle Delete
      const handleDelete = async id => {
        console.log(id)
        try {
          await mutateAsync(id)
        } catch (err) {
          console.log(err)
        }
      }

    const onSubmit = async (data) => {


        try {
            const deadlineDate = new Date(data.deadline);
            const formattedDeadline = `${deadlineDate.getFullYear()}-${(
                "0" +
                (deadlineDate.getMonth() + 1)
            ).slice(-2)}-${("0" + deadlineDate.getDate()).slice(-2)}T${(
                "0" +
                deadlineDate.getHours()
            ).slice(-2)}:${("0" + deadlineDate.getMinutes()).slice(-2)}:${(
                "0" +
                deadlineDate.getSeconds()
            ).slice(-2)}Z`;

            const updatedData = {
                ...data,
                deadline: formattedDeadline,
            };


            const response = await axiosCommon.put(`/update-contest/${data._id}`, updatedData);

            if (response.data.modifiedCount > 0) {
                // Update successful
                reset();
                // Optionally, refetch the contest data to update the UI
            } else {
                // Handle the case where the update failed
            }
        } catch (error) {
            console.error("Error updating contest:", error);
        }
    };


    const handleUpdate = async (id) => {
        try {
            const { data } = await axiosCommon.get(`/contest-details/${id}`);
            setName(data.name);
            setImage(data.image);
            setDescription(data.description);
            setRegistrationPrice(data.registrationPrice);
            setPrize(data.prize);
            setTask(data.task);
            setTags(data.tags);
            document.getElementById('my_modal_3').showModal();
        } catch (error) {
            console.error("Error fetching contest details:", error);
        }

    };



    return (
        <div className="container mx-auto max-w-7xl w-11/12">
            <div className="flex items-center justify-center flex-col my-12 gap-8">
                <div className="flex justify-between items-center">
                    <Fade triggerOnce={true} delay={300} direction="up">
                        <div className="flex gap-3 items-center justify-center">
                            <h1 className="text-3xl md:text-5xl font-extrabold">My Created Contests</h1>
                            <div className="badge badge-info badge-lg text-white gap-2">
                                {contests && contests.length}
                            </div>
                        </div>
                    </Fade>
                </div>

                <div className="w-full">
                    {
                        isLoading &&
                        <div className="flex items-center justify-center h-96">
                            <div className="loading loading-spinner"></div>
                        </div>
                    }
                    <div className="overflow-x-auto">
                        <Fade delay={1000}>

                            <table className="table table-sm md:table-lg bg-base-300/30">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Contest title</th>
                                        <th>Contest Description</th>
                                        <th>Status</th>
                                        {/* <th>Update</th> */}
                                        {/* <th>Delete</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        contests && contests.map(({ name, description, _id }, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="opacity-80">
                                                        {name}
                                                        <br />
                                                        {/* <span className="badge badge-ghost badge-sm">{name}</span> */}
                                                    </td>
                                                    <td>
                                                        {description}
                                                    </td>
                                                    <td className="opacity-70">
                                                        <div className="badge badge-accent badge-outline">{status || 'null'}</div>
                                                    </td>
                                                    <th>
                                                        <button onClick={() => { handleUpdate(_id) }} className="btn btn-circle btn-outline btn-warning">
                                                            <LuPencil />
                                                        </button>
                                                    </th>
                                                    <th>
                                                        <button onClick={() => { handleDelete(_id) }} className="btn btn-circle btn-outline btn-error">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        </button>
                                                    </th>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                                {
                                    contests.length === 0 && 
                                    <div className="h-64 flex flex-col items-center justify-center gap-7">
                                        <h2 className="text-center text-2xl font-bold md:text-4xl">No contests found</h2>
                                        <p className="opacity-70 text-lg">Try adding <Link to='/dashboard/add_contest' className="text-accent hover:underline-offset-4 underline lg:no-underline hover:underline cursor-pointer">contest</Link></p>
                                    </div>
                                }
                        </Fade>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal backdrop-filter backdrop-blur-sm">
                <div className="modal-box bg-base-300/90">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl md:text-4xl mb-5">Update Contest</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <p>Contest Name</p>
                        <input {...register("name", { required: true })} defaultValue={name} type="text" className="input input-bordered w-full max-w-xs lg:max-w-xl md:max-w-md" placeholder="Contest Name" />
                        {errors.name && <span className='text-error'>This field is required</span>}
                        <div>
                            <p>Image URL</p>
                            <input {...register("image", { required: true })} defaultValue={image} placeholder="Insert Image URL" type="text" className="input input-bordered w-full max-w-xs lg:max-w-xl md:max-w-md" />
                            {errors.image && <span className='text-error'>This field is required</span>}
                        </div>
                        <div>
                            <p>Description</p>
                            <textarea {...register("description", { required: true })} defaultValue={description} className="textarea textarea-bordered w-full bg-base-100/30 max-w-xs lg:max-w-xl md:max-w-md" placeholder="Description"></textarea>
                            {errors.description && <span className='text-error'>This field is required</span>}
                        </div>
                        <div>
                            <p>Contest Registration Price</p>
                            <input {...register("registrationPrice", { required: true })} defaultValue={registrationPrice} type="text" placeholder="Contest Price" className="input w-full max-w-xs lg:max-w-xl md:max-w-md" />
                            {errors.registrationPrice && <span className='text-error'>This field is required</span>}
                        </div>
                        <div>
                            <p>Prize Money</p>
                            <input {...register("prize", { required: true })} defaultValue={prize} type="text" placeholder="Price Money" className="input w-full max-w-xs lg:max-w-xl md:max-w-md" />
                            {errors.prize && <span className='text-error'>This field is required</span>}
                        </div>
                        <div>
                            <p>Task Submission</p>
                            <textarea {...register("task", { required: true })} defaultValue={task} type="text" placeholder="Task Submission (text)" className="textarea textarea-bordered w-full max-w-xs lg:max-w-xl md:max-w-md" />
                            {errors.task && <span className='text-error'>This field is required</span>}
                        </div>
                        <div>
                            <p>Contest Tags</p>
                            <select {...register("tags", { required: true })} defaultValue={tags} className="select w-full max-w-xs lg:max-w-xl md:max-w-md">4
                                {errors.tags && <span className='text-error'>This field is required</span>}
                                <option disabled selected>Select contest tags</option>
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
                        {/* <h3>Choose Deadline</h3>
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
                        </div> */}
                        <div className="flex items-center justify-center">
                            <button className="btn glass lg:btn-lg md:btn-md btn-sm btn-wide rounded-full">Update</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyCreatedContest;