import bannerImg from '../assets/images/banner.jpg'

const Banner = () => {
    return (
        <>
            <div className="hero h-48 md:h-96 rounded-3xl shadow-2xl" style={{ backgroundImage: `url(${bannerImg})` }}>
                <div className="hero-overlay bg-opacity-80 rounded-3xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 md:text-5xl text-xl font-extrabold font-nunito">Compete. Create. Conquer.</h1>
                        <p className="mb-5">Discover Exciting Challenges and Showcase Your Talent</p>
                        <div className="join">
                            <label className="input input-bordered flex items-center gap-2 glass rounded-full join-item">
                                <input type="text" className="grow input-sm md:input-md lg:input-lg" placeholder="Search Contests..." />
                            </label>
                            <button className="btn join-item rounded-full glass">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;