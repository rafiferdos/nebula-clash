import Banner from "../../components/Banner";
import PopularContests from "../../components/PopularContests";

const Home = () => {
    return (
        <div className="container mx-auto my-8 max-w-7xl w-11/12 md:space-y-10 space-y-8 lg:space-y-16">
            <Banner />
            <PopularContests />
        </div>
    );
};

export default Home;