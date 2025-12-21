import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

import "swiper/css";
import "swiper/css/navigation";

const images = [banner1, banner2, banner3];

const Slider = () => {
    return (
        <div className="relative w-full h-125 md:h-175">
            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop
                className="h-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-r from-rose-900/80 via-red-900/60 to-transparent"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 space-y-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                    className="text-white text-3xl md:text-6xl font-bold leading-tight drop-shadow-lg"
                                >
                                    <Typewriter
                                        words={[
                                            "Donate blood, save lives.",
                                            "Be a hero — Donate Today!",
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
                                    className="text-gray-200 text-lg md:text-2xl max-w-xl drop-shadow-md"
                                >
                                    Your blood is precious. Save a life, make a difference.
                                </motion.p>

                                {/* Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 1 }}
                                    className="flex flex-wrap gap-4 mt-4"
                                >
                                    <button className="bg-green-600 px-6 py-3 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-lg">
                                        Join As Donor
                                    </button>
                                    <button className="bg-red-600 px-6 py-3 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-lg">
                                        Search Donors
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
