import React from 'react';

const categories = [
    {
        name: "Support Campaigns",
        icon: "🩸",
        tooltip: "Participate in fundraising and blood donation campaigns."
    },
    {
        name: "Blood Facts",
        icon: "📊",
        tooltip: "Learn interesting facts and statistics about blood donation."
    },
    {
        name: "Success Stories",
        icon: "🎉",
        tooltip: "Read stories of lives saved through donations."
    }
];

const CategorySection = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-red-600">Our Focus Areas</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition cursor-pointer text-center"
                        title={cat.tooltip}
                    >
                        <div className="text-5xl mb-4">{cat.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                        <p className="text-gray-600">{cat.tooltip}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
