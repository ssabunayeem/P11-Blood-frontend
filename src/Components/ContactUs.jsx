import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaHeartbeat } from "react-icons/fa";

const ContactUs = () => {
    return (
        <section className="bg-linear-to-br from-red-700 to-red-900 py-20 px-4 text-white">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-4xl font-bold text-white! flex items-center justify-center gap-3">
                        <FaHeartbeat className=" animate-pulse" />
                        Contact Us
                    </h2>
                    <p className="mt-3 text-red-100 max-w-xl mx-auto">
                        Have questions or want to become a lifesaver? Reach out to us anytime.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-4">
                            <FaEnvelope className="text-2xl text-red-300" />
                            <p className="text-lg">info@bloodbridge.com</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaPhoneAlt className="text-2xl text-red-300" />
                            <p className="text-lg">(+880) 123 456 789</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <FaMapMarkerAlt className="text-2xl text-red-300" />
                            <p className="text-lg">Dhaka, Bangladesh</p>
                        </div>

                        <p className="text-red-100 mt-6">
                            Your single donation can save up to three lives. We are here to guide you every step.
                        </p>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-white p-8 rounded-xl shadow-xl text-black space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        />

                        <textarea
                            placeholder="Your Message"
                            rows="4"
                            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                        ></textarea>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Send Message ❤️
                        </motion.button>
                    </motion.form>

                </div>
            </div>
        </section>
    );
};

export default ContactUs;
