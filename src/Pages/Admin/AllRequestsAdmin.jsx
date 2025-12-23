import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecqure";
import toast from "react-hot-toast";

const AllRequestsAdmin = () => {
    const { role } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [requests, setRequests] = useState([]);

    const fetchRequests = () => {
        axiosSecure.get("/admin/requests").then((res) => {
            setRequests(res.data);
        });
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = (id, status) => {
        axiosSecure
            .patch(`/requests/update/status/${id}`, { status })
            .then(() => {
                toast.success("Status updated");
                fetchRequests();
            });
    };

    return (
        <div className="bg-white/50 p-5">
            <h2 className="text-2xl font-bold mb-5">All Donation Requests</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Requester</th>
                            <th>Hospital</th>
                            <th>Blood</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map((req, i) => (
                            <tr key={req._id}>
                                <td>{i + 1}</td>
                                <td>{req.requester_name}</td>
                                <td>{req.hospitalName}</td>
                                <td>{req.bloodGroup}</td>
                                <td>
                                    <span className="badge badge-outline">
                                        {req.donation_status}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    {/* ADMIN + VOLUNTEER */}
                                    {req.donation_status === "pending" && (
                                        <button
                                            onClick={() => updateStatus(req._id, "inprogress")}
                                            className="btn btn-xs btn-info"
                                        >
                                            Start
                                        </button>
                                    )}

                                    {req.donation_status === "inprogress" && (
                                        <>
                                            <button
                                                onClick={() => updateStatus(req._id, "done")}
                                                className="btn btn-xs btn-success"
                                            >
                                                Done
                                            </button>
                                            <button
                                                onClick={() => updateStatus(req._id, "cancel")}
                                                className="btn btn-xs btn-error"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {/* ADMIN ONLY EXTRA (optional future) */}
                                    {role === "admin" && (
                                        <span className="text-xs text-gray-400">
                                            Admin access
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequestsAdmin;
