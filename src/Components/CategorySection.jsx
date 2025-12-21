import React from "react";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

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

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

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
                    <motion.div
                        key={index}
                        onClick={() => navigate(cat.path)}
                        data-tooltip-id="category-tooltip"
                        data-tooltip-content={cat.tooltip}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-xl overflow-hidden cursor-pointer group shadow-lg"
                    >
                        {/* Background Image */}
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-500"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gray-900/60 group-hover:bg-red-700/40 transition"></div>

                        {/* Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <span className="text-5xl mb-2 animate-bounce">{cat.icon}</span>
                            <h2 className="text-2xl font-semibold text-white! drop-shadow-lg text-center">
                                {cat.name}
                            </h2>
                        </div>
                    </motion.div>
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
