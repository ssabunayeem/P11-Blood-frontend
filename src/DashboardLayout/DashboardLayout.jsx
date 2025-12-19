import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../Components/Aside';
import { FaBars } from 'react-icons/fa';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-lg"
            >
                <FaBars />
            </button>

            {/* Sidebar */}
            <Aside isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Main Content */}
            <div className="md:ml-72 min-h-screen bg-gray-200 p-6">
                <Outlet />
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                />
            )}
        </div>
    );
};

export default DashboardLayout;
