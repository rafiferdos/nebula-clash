import errorImg from '../assets/images/404.svg'
import { IoMdArrowBack } from "react-icons/io";

const ErrorPage = () => {
    return (
        <>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='space-y-8 flex flex-col'>
                    <img src={errorImg} alt="404" className="w-96" />
                    <p className="md:text-lg text-sm font-nunito text-center opacity-70">The page you are looking for does not exist</p>
                    <button
                        className='btn glass lg:btn-lg md:btn-md btn-sm bg-base-200'
                        onClick={() => window.history.back()}
                    >
                        <IoMdArrowBack />
                        Go Back
                    </button>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;