import Banner from "../../components/Banner";
import PopularContests from "../../components/PopularContests";

const Home = () => {
    return (
        <div className="container mx-auto md:my-16 lg:my-32 my-12 max-w-7xl w-11/12 md:space-y-24 space-y-16 lg:space-y-24">
            <Banner />
            <PopularContests />
        </div>
    );
};

export default Home;