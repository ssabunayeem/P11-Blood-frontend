import React from "react";
import { FaHandsHelping, FaHeartbeat, FaUserFriends } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const features = [
    {
        title: "Support Our Campaigns",
        description:
            "Join our ongoing blood donation campaigns and help save lives.",
        icon: <FaHandsHelping size={50} className="text-red-600" />,
    },
    {
        title: "Did You Know?",
        description:
            "Every 2 seconds someone needs blood. Your donation can make a difference.",
        icon: <FaHeartbeat size={50} className="text-red-600" />,
    },
    {
        title: "Success Stories",
        description:
            "Read inspiring stories of people whose lives were saved by donors like you.",
        icon: <FaUserFriends size={50} className="text-red-600" />,
    },
];

const OurFeatures = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-red-600">
                Our Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className="flex flex-col items-center text-center bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                    >
                        <div className="mb-6 animate-bounce">{feature.icon}</div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-300 text-sm md:text-base">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OurFeatures;
