import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

import 'swiper/css';
import 'swiper/css/navigation';

const images = [banner1, banner2, banner3];
// replace with your BloodBridge images

const Slider = () => {
    return (
        <div className="relative w-full h-175">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-175">
                            <img src={img} alt="" className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-linear-to-r from-rose-900/90 via-red-900/60 to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 space-y-4">
                                <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
                                    <Typewriter
                                        words={['Donate blood, save lives.', 'Be a hero — Donate Today!']}
                                        loop={0}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={80}
                                        deleteSpeed={50}
                                        delaySpeed={2000}
                                    />
                                </h1>
                                <p className="text-gray-200 text-lg md:text-2xl max-w-xl">
                                    Your blood is precious. Save a life, make a difference.
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <button className="bg-green-600 px-6 py-3 text-white font-semibold rounded hover:bg-green-700 transition">
                                        Join As Donor
                                    </button>
                                    <button className="bg-red-600 px-6 py-3 text-white font-semibold rounded hover:bg-red-700 transition">
                                        Search Donors
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
