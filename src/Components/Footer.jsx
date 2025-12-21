import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300 pt-12">

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white py-8 px-6 text-center rounded-t-2xl">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Become a Lifesaver Today!
                </h3>
                <p className="mb-4 text-sm md:text-base">
                    Join our community of generous donors and help save lives with every drop.
                </p>
                <a
                    href="/donate"
                    className="inline-block bg-white text-red-600 font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition"
                >
                    Donate Now
                </a>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-6">

                {/* Brand + About */}
                <div className="flex flex-col items-start gap-3">
                    <img src={logo} alt="YIM Blood Donation" className="w-24 h-24 rounded-full border-2 border-red-500" />
                    <h4 className="text-xl font-bold text-white">YIM Blood Donation</h4>
                    <p className="text-sm text-gray-400">
                        A community‑driven platform dedicated to saving lives through compassionate blood donation.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg font-semibold text-white">Quick Links</h5>
                    <a href="/" className="hover:text-white transition">Home</a>
                    <a href="/search-request" className="hover:text-white transition">Find Blood</a>
                    <a href="/donate" className="hover:text-white transition">Donate Blood</a>
                    <a href="/all-request" className="hover:text-white transition">All Requests</a>
                </div>

                {/* Contact & Social */}
                <div className="flex flex-col gap-2">
                    <h5 className="text-lg font-semibold text-white">Connect With Us</h5>
                    <p className="text-sm text-gray-400">Stay updated via social media</p>
                    <div className="flex gap-4 text-xl text-gray-300">
                        <a href="https://facebook.com" className="hover:text-white transition"><FaFacebook /></a>
                        <a href="https://twitter.com" className="hover:text-white transition"><FaTwitter /></a>
                        <a href="https://instagram.com" className="hover:text-white transition"><FaInstagram /></a>
                        <a href="https://linkedin.com" className="hover:text-white transition"><FaLinkedin /></a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
                © {new Date().getFullYear()} YIM Blood Donation. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
