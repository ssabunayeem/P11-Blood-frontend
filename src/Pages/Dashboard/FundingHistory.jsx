import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecqure";

const FundingHistory = () => {
    const axiosSecure = useAxiosSecure();
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);

    // ================= Fetch All Fund History =================
    const fetchFundingHistory = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get("/payments");
            setFunds(res.data);
        } catch (err) {
            console.error("Error fetching fund history:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFundingHistory();
    }, [axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6 text-rose-50!">Funding History</h2>

            {loading ? (
                <p className="text-gray-500">Loading fund history...</p>
            ) : funds.length === 0 ? (
                <p className="text-gray-500">No fund history available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {funds.map((fund, index) => (
                        <div
                            key={fund._id || index}
                            className="bg-rose-50/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-gray-200 flex flex-col justify-between transition transform hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="mb-3">
                                <p className="text-sm text-gray-500"># {index + 1}</p>
                                <p className="text-gray-700 font-semibold text-lg">
                                    {fund.donorName || fund.donorEmail || "Anonymous"}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div>
                                    <p className="text-sm text-gray-400">Date</p>
                                    <p className="text-gray-600">
                                        {fund.paidAt
                                            ? new Date(fund.paidAt).toLocaleDateString("en-GB")
                                            : "N/A"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Amount</p>
                                    <p className="text-green-600 font-bold text-lg">
                                        ${fund.amount?.toFixed(2) || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FundingHistory;
