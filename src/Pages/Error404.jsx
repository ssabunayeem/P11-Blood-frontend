import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineBloodtype } from "react-icons/md";

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen b px-4">
            <div className="text-center">
                {/* Icon */}
                <div className="text-red-600 mb-4">
                    <MdOutlineBloodtype size={80} className="animate-bounce" />
                </div>

                {/* Error Code */}
                <h1 className="text-9xl font-extrabold text-red-600 mb-4 drop-shadow-lg animate-bounce">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                    The page you are looking for does not exist or has been moved.
                </p>

                {/* Go Home Button */}
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition transform hover:scale-105"
                >
                    Go to Home
                </Link>
            </div>

            {/* Optional decorative blood drop shapes */}
            <div className="absolute top-10 left-10 text-red-100 opacity-20 text-6xl animate-bounce">
                <MdOutlineBloodtype />
            </div>
            <div className="absolute bottom-10 right-10 text-red-100 opacity-20 text-6xl animate-bounce">
                <MdOutlineBloodtype />
            </div>
        </div>
    );
};

export default Error404;
