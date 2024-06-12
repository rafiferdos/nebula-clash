const DashboardWelcome = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="md:w-3/5 mx-auto space-y-7 text-center">
                <h1 className="lg:text-7xl md:text-4xl text-3xl">Welcome to dashboard</h1>
                <p>This is your central hub for managing and viewing all your application data. Navigate through the different sections to interact with your data, view analytics, and make updates as needed.</p>
            </div>
        </div>
    );
};

export default DashboardWelcome;