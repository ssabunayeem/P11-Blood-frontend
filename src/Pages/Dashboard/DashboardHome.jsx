import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecqure";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Users, Droplet, DollarSign } from "lucide-react";

const DashboardHome = () => {
    const { user, role } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalRequests: 0,
        totalFunds: 0,
    });

    const [loadingRequests, setLoadingRequests] = useState(true);
    const [loadingStats, setLoadingStats] = useState(true);

    // 🔹 Recent Requests (Donor/Admin)
    useEffect(() => {
        axiosSecure
            .get("/dashboard/recent-requests")
            .then((res) => {
                setRequests(res.data);
                setLoadingRequests(false);
            })
            .catch(() => setLoadingRequests(false));
    }, [axiosSecure]);

    // 🔹 Admin Statistics
    useEffect(() => {
        if (role === "admin") {
            axiosSecure.get("/admin/stats").then((res) => {
                setStats(res.data);
                setLoadingStats(false);
            });
        }
    }, [role, axiosSecure]);

    return (
        <div>
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow p-6 mb-8 border-l-4 border-red-600"
            >
                <h2 className="text-2xl font-bold text-gray-800">
                    Welcome back,{" "}
                    <span className="text-red-600">{user?.displayName}</span> 👋
                </h2>
                <p className="text-gray-500 mt-1">
                    Manage blood donation activities from your dashboard
                </p>
            </motion.div>

            {/* 🔥 ADMIN STATS CARDS */}
            {role === "admin" && !loadingStats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Users className="text-blue-600" size={30} />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Users</p>
                            <h2 className="text-2xl font-bold">{stats.totalUsers}</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-full">
                            <Droplet className="text-red-600" size={30} />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Requests</p>
                            <h2 className="text-2xl font-bold">
                                {stats.totalRequests}
                            </h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="text-green-600" size={30} />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Funds</p>
                            <h2 className="text-2xl font-bold">
                                ${stats.totalFunds}
                            </h2>
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Requests */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-semibold mb-4">
                    🩸 Recent Donation Requests
                </h3>

                {loadingRequests && <p>Loading...</p>}

                {!loadingRequests && requests.length === 0 && (
                    <p className="text-gray-500 text-center py-6">
                        No recent donation requests found.
                    </p>
                )}

                {!loadingRequests && requests.length > 0 && (
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
                                            <span
                                                className={`badge 
                          ${req.donation_status === "pending" && "badge-warning"}
                          ${req.donation_status === "inprogress" && "badge-info"}
                          ${req.donation_status === "done" && "badge-success"}
                          ${req.donation_status === "cancel" && "badge-error"}
                        `}
                                            >
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
