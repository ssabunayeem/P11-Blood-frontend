import React from 'react';
import feature1 from '../assets/1.jpg';
import feature2 from '../assets/2.jpg';
import feature3 from '../assets/3.jpg';

const features = [
    {
        title: "Support Our Campaigns",
        description: "Highlight ongoing fundraising campaigns or initiatives.",
        image: feature1
    },
    {
        title: "Did You Know?",
        description: "Share interesting facts and statistics about blood donation.",
        image: feature2
    },
    {
        title: "Success Stories",
        description: "Show inspiring stories of people whose lives were saved.",
        image: feature3
    }
];

const OurFeatures = () => (
    <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-red-600">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
                    <img src={feature.image} alt={feature.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default OurFeatures;
