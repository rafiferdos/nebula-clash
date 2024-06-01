import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast";
import { ThemeContext } from "../provider/ThemeProvider";
import { useContext } from "react";
const ContactUs = () => {
    const { theme } = useContext(ThemeContext)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = () => {
        // Start the loading toast
        let toastId = toast.loading("Sending...", {
            style: {
                backgroundColor: theme === "dark" ? "rgb(0,0,0, 0.1)" : "rgb(255,255,255, 0.1)",
                color: theme === "dark" ? "#fff" : "#000",
                backdropFilter: theme === "dark" ? "blur(10px)" : "blur(10px)",
                borderRadius: "9999px"
            },
        
        });

        // Simulate a delay with setTimeout
        setTimeout(() => {
            // Remove the loading toast
            toast.dismiss(toastId);

            // Show a toast with a background color based on the theme
            toast.success("Message sent successfully", {
                style: {
                    backgroundColor: theme === "dark" ? "rgb(0,0,0, 0.1)" : "rgb(255,255,255, 0.1)",
                    color: theme === "dark" ? "#fff" : "#000",
                    backdropFilter: theme === "dark" ? "blur(10px)" : "blur(10px)",
                    borderRadius: "9999px"
                },
            });

            // Reset the form
            reset();
        }, 1000);

    }

    return (
        <div className="container mx-auto max-w-7xl w-11/12 my-8 md:my-0">
            <div className="flex items-center justify-center md:h-[calc(100vh-150px)]">
                <div className="lg:w-1/2 md:w-3/4 w-11/12 border md:p-7 lg:p-16 p-4 rounded-3xl glass shadow-2xl">
                    <h1 className="md:text-4xl text-xl font-nunito font-bold text-center">Contact Us</h1>
                    <p className="md:text-lg text-sm font-nunito text-center">For any queries, feel free to contact us </p>
                    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <input type="text" placeholder="Full Name" className="input input-bordered bg-base-100/50" {...register("name", { required: true })} />
                            {errors.name && <span className="text-xs text-red-500">This field is required</span>}
                            <input type="email" placeholder="Email" className="input input-bordered bg-base-100/50" {...register("email", { required: true })} />
                            {errors.email && <span className="text-xs text-red-500">This field is required</span>}
                            <textarea placeholder="Message" className="textarea textarea-bordered h-32 bg-base-100/50" {...register("message", { required: true })} />
                            {errors.message && <span className="text-xs text-red-500">This field is required</span>}
                            <button type="submit" className="btn glass lg:btn-lg md:btn-md btn-sm">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ContactUs;