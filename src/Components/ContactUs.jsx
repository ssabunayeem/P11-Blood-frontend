import React from 'react';

const ContactUs = () => (
    <div className="bg-red-700 py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <p className="mb-2">Email: info@bloodbridge.com</p>
                <p>Support: (+880) 123 456 789</p>
            </div>
            <form className="bg-white p-6 rounded text-black flex flex-col gap-4">
                <input type="text" placeholder="First Name" className="border p-2 rounded" />
                <input type="text" placeholder="Last Name" className="border p-2 rounded" />
                <input type="email" placeholder="Email" className="border p-2 rounded" />
                <textarea placeholder="Message" className="border p-2 rounded"></textarea>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Send Message</button>
            </form>
        </div>
    </div>
);

export default ContactUs;
