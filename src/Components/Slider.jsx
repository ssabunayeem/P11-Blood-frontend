// src/components/Slider.jsx
import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const images = [banner1, banner2, banner3];

const Slider = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 5000); // 5s per slide
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
            {/* Background Images */}
            <AnimatePresence>
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`Slide ${current + 1}`}
                    className="absolute w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-red-900/30 to-transparent" />

            {/* Text & Buttons */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20">
                <div className="max-w-4xl bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-white text-4xl md:text-6xl font-extrabold leading-tight"
                    >
                        <Typewriter
                            words={[
                                "Donate Blood, Save Lives",
                                "Be a Hero Today",
                                "Your Blood, Their Hope",
                            ]}
                            loop={0}
                            cursor
                            cursorStyle="|"
                            typeSpeed={80}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-gray-200 text-lg md:text-2xl"
                    >
                        Every drop counts. Donate blood and make a difference in someone's life today.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="flex flex-wrap gap-4 mt-4"
                    >
                        <button
                            onClick={() => navigate("/donate")}
                            className="bg-green-600 px-6 py-3 text-white font-semibold rounded-xl hover:bg-green-700 transition shadow-lg"
                        >
                            Join as Donor
                        </button>

                        <button
                            onClick={() => navigate("/search-request")}
                            className="bg-red-600 px-6 py-3 text-white font-semibold rounded-xl hover:bg-red-700 transition shadow-lg"
                        >
                            Search Donors
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
