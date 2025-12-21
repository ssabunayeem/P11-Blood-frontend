import React from "react";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import img1 from "../assets/logo.png";
import img2 from "../assets/logo.png";
import img3 from "../assets/logo.png";
import img4 from "../assets/logo.png";

const categories = [
    {
        name: "Find Blood",
        icon: "🩸",
        image: img1,
        path: "/search-request",
        tooltip: "Search blood donors by group and location",
    },
    {
        name: "Donate Blood",
        icon: "❤️",
        image: img2,
        path: "/donate",
        tooltip: "Become a hero and donate blood",
    },
    {
        name: "Blood Requests",
        icon: "📋",
        image: img3,
        path: "/all-request",
        tooltip: "View all blood donation requests",
    },
    {
        name: "Emergency",
        icon: "🚑",
        image: img4,
        path: "/search-request?urgent=true",
        tooltip: "Urgent blood needs near you",
    },
];

const CategorySection = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-red-700">
                    Blood Donation Services
                </h2>
                <p className="mt-3 text-gray-600">
                    Choose how you want to help save lives
                </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(cat.path)}
                        data-tooltip-id="category-tooltip"
                        data-tooltip-content={cat.tooltip}
                        className="relative rounded-xl overflow-hidden cursor-pointer group text-white shadow-lg"
                    >
                        {/* Background Image */}
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-57.5 object-cover group-hover:scale-110 transition-all duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-red-900/50 group-hover:bg-red-900/70 transition"></div>

                        {/* Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl mb-2">{cat.icon}</span>
                            <h2 className="text-2xl font-semibold drop-shadow text-white!">
                                {cat.name}
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tooltip */}
            <Tooltip
                id="category-tooltip"
                place="top"
                className="bg-red-600 text-white px-3 py-1 rounded shadow-lg"
            />
        </div>
    );
};

export default CategorySection;
