import React from "react";
import { useNavigate } from "react-router";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

import img1 from "../assets/cat1.jpg";
import img2 from "../assets/cat2.jpg";
import img3 from "../assets/cat3.jpg";
import img4 from "../assets/cat4.jpg";

const categories = [
    {
        name: "Pets (Adoption)",
        icon: "🐶",
        image: img1,
        category: "Pets",
        tooltip: "Find adorable pets ready for adoption!"
    },
    {
        name: "Pet Food",
        icon: "🍖",
        image: img2,
        category: "Food",
        tooltip: "High-quality food for your furry friends."
    },
    {
        name: "Accessories",
        icon: "🧸",
        image: img3,
        category: "Accessories",
        tooltip: "Stylish accessories for your pets."
    },
    {
        name: "Pet Care",
        icon: "💊",
        image: img4,
        category: "Care Products",
        tooltip: "All the care products your pet needs."
    },
];

const CategorySection = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Shop by Category</h2>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            navigate(`/services?category=${encodeURIComponent(cat.category)}`)
                        }
                        data-tooltip-id="category-tooltip"        // same tooltip id for all
                        data-tooltip-content={cat.tooltip}        // different content
                        className="relative rounded-xl overflow-hidden cursor-pointer group text-white"
                    >
                        {/* Background Image */}
                        <img
                            src={cat?.image}
                            alt={cat?.name}
                            className="w-full h-[220px] object-cover group-hover:scale-110 transition-all duration-500"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50"></div>

                        {/* Category Title */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-2xl font-semibold gap-2 flex items-center drop-shadow-lg">
                                <span>{cat?.icon}</span> <span className="text-white">{cat?.name}</span>
                            </h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Global Tooltip */}
            <Tooltip
                id="category-tooltip"
                place="top"
                effect="solid"
                className="bg-blue-600 text-white px-3 py-1 rounded shadow-lg"
            />
        </div>
    );
};

export default CategorySection;
