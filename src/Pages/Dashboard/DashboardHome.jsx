import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecqure";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get("/dashboard/recent-requests")
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosSecure]);

    useEffect(() => {
        axiosSecure.get("/dashboard/recent-requests")
            .then(res => {
                console.log("RECENT REQUEST:", res.data);
                setRequests(res.data);
                setLoading(false);
            });
    }, [axiosSecure]);


    return (
        <div>
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow p-6 mb-8 border-l-4 border-red-600"
            >
                <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back, <span className="text-red-600">{user?.displayName}</span> 👋
                </h2>
                <p className="text-gray-500 mt-1">
                    Here are your recent blood donation requests
                </p>
            </motion.div>

            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold mb-4">
                    🩸 Recent Donation Requests
                </h3>

                {loading && <p>Loading...</p>}

                {!loading && requests.length === 0 && (
                    <p className="text-gray-500 text-center py-6">
                        You haven’t created any donation request yet.
                    </p>
                )}

                {!loading && requests.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Hospital</th>
                                    <th>Blood Group</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req, index) => (
                                    <tr key={req._id}>
                                        <td>{index + 1}</td>
                                        <td>{req.hospitalName}</td>
                                        <td>{req.bloodGroup}</td>
                                        <td>
                                            <span className={`badge 
                        ${req.donation_status === "pending" && "badge-warning"}
                        ${req.donation_status === "inprogress" && "badge-info"}
                        ${req.donation_status === "done" && "badge-success"}
                        ${req.donation_status === "canceled" && "badge-error"}
                      `}>
                                                {req.donation_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
