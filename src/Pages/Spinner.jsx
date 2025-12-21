import { Circles } from "react-loader-spinner";

const Spinner = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Circles
                height="80"
                width="80"
                color="crimson"
                ariaLabel="loading"
            />
        </div>
    );
};

export default Spinner;
