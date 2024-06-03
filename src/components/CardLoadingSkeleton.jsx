const CardLoadingSkeleton = () => {
    return (
        <div className="flex flex-col gap-4 w-80 lg:w-96">
            <div className="skeleton h-56 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    );
};

export default CardLoadingSkeleton;