import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DonationDetails = () => {
    const { id } = useParams();
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axiosInstance
            .get(`/requests/${id}`)
            .then((res) => {
                setRequest(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleDonate = () => {
        if (!user) {
            toast.error("Please login to donate");
            return navigate("/login");
        }
        setShowModal(true);
    };

    const confirmDonate = () => {
        axiosInstance
            .patch(`/requests/update/status/${id}`, { status: "inprogress" })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Donation status changed to InProgress!");
                    setShowModal(false);
                    navigate("/dashboard/my-request");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Update failed! Try again.");
            });

    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!request) return <p className="text-center mt-10">Not found!</p>;

    return (
        <>
            {/* Page Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto p-6 my-15 bg-white shadow-xl rounded-2xl max-h-screen"
            >
                <h2 className="text-3xl font-bold text-red-700 mb-5 text-center">
                    Donation Request Details
                </h2>

                {/* Recipient Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 bg-red-50 rounded-lg border border-red-100 shadow-sm mb-4"
                >
                    <h3 className="text-xl font-semibold text-red-600">Recipient Info</h3>
                    <p><strong>Name:</strong> {request.requester_name}</p>
                    <p>
                        <strong>Location:</strong> {request.requester_district},{" "}
                        {request.requester_upazila}
                    </p>
                </motion.div>

                {/* Donation Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 shadow-sm mb-4"
                >
                    <h3 className="text-xl font-semibold text-yellow-600">Donation Info</h3>
                    <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                    <p><strong>Date:</strong> {request.donationDate}</p>
                    <p><strong>Time:</strong> {request.donationTime}</p>
                    <p><strong>Hospital:</strong> {request.hospitalName}</p>
                </motion.div>

                {/* Additional Details Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100 shadow-sm mb-4"
                >
                    <h3 className="text-xl font-semibold text-blue-600">More Details</h3>
                    <p><strong>Address:</strong> {request.fullAddress}</p>
                    <p><strong>Message:</strong> {request.requestMessage}</p>
                </motion.div>

                {/* Status Badge */}
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-4"
                >
                    <span
                        className={`inline-block px-4 py-2 font-semibold rounded-full ${request.donation_status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : request.donation_status === "inprogress"
                                ? "bg-blue-200 text-blue-800"
                                : request.donation_status === "done"
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                            }`}
                    >
                        {request.donation_status.toUpperCase()}
                    </span>
                </motion.div>

                {/* Donate Button */}
                {request.donation_status === "pending" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="flex justify-center mt-8"
                    >
                        <button
                            onClick={handleDonate}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition"
                        >
                            Donate Blood
                        </button>
                    </motion.div>
                )}
            </motion.div>

            {/* Centered Blur Modal with Animation */}
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex justify-center
                    max-h-screen items-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center"
                    >
                        <h3 className="text-2xl font-bold text-red-600 mb-3">
                            Confirm Donation
                        </h3>
                        <p className="text-gray-700">
                            Donor: <strong>{user?.displayName}</strong>
                        </p>
                        <p className="text-gray-700 mb-4">
                            Email: <strong>{user?.email}</strong>
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="btn btn-outline px-4 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDonate}
                                className="btn bg-red-600 text-white px-4 py-2 hover:bg-red-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default DonationDetails;
