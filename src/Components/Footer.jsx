import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const Footer = () => {
    return (
        <motion.footer
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-slate-900 via-red-900 to-rose-900 text-gray-300"
        >
            {/* Blur Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>

            {/* Content Wrapper */}
            <div className="relative z-10 p-12">

                {/* CTA Section */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white py-8 px-6 text-center rounded-2xl shadow-lg"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        Become a Lifesaver Today!
                    </h3>
                    <p className="mb-4 text-sm md:text-base text-gray-200">
                        Join our community of generous donors and help save lives with every drop.
                    </p>
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="/donate"
                        className="inline-block bg-gradient-to-r from-red-600 to-rose-500 text-white font-bold px-6 py-2 rounded-full shadow-lg"
                    >
                        Donate Now
                    </motion.a>
                </motion.div>

                {/* Main Footer Content */}
                <motion.div
                    variants={containerVariants}
                    className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6"
                >
                    {/* Brand */}
                    <motion.div variants={itemVariants} className="flex flex-col items-start gap-3">
                        <img
                            src={logo}
                            alt="YIM Blood Donation"
                            className="w-24 h-24 rounded-full border-2 border-red-500"
                        />
                        <h4 className="text-xl font-bold text-white">
                            YIM Blood Donation
                        </h4>
                        <p className="text-sm text-gray-300">
                            A community-driven platform dedicated to saving lives through compassionate blood donation.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold text-white">Quick Links</h5>
                        <a href="/" className="hover:text-white transition">Home</a>
                        <a href="/search-request" className="hover:text-white transition">Find Blood</a>
                        <a href="/donate" className="hover:text-white transition">Donate Blood</a>
                        <a href="/all-request" className="hover:text-white transition">All Requests</a>
                    </motion.div>

                    {/* Social */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-2">
                        <h5 className="text-lg font-semibold text-white">Connect With Us</h5>
                        <p className="text-sm text-gray-300">Stay updated via social media</p>
                        <div className="flex gap-4 text-xl">
                            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    whileHover={{ scale: 1.3, rotate: 5 }}
                                    href="#"
                                    className="hover:text-white transition"
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="border-t border-white/10 text-center py-4 text-sm text-gray-400"
                >
                    © {new Date().getFullYear()} YIM Blood Donation. All Rights Reserved.
                </motion.div>

            </div>
        </motion.footer>
    );
};

export default Footer;
