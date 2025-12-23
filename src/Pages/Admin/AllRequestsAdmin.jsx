import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecqure";

const AllRequestsAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get("/admin/requests")
                .then((res) => {
                    setRequests(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [axiosSecure, user]);

    if (loading) return <p>Loading requests...</p>;

    if (requests.length === 0)
        return <p>No donation requests available.</p>;


    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Requester</th>
                        <th>Email</th>
                        <th>District / Upazila</th>
                        <th>Hospital</th>
                        <th>Blood Group</th>
                        <th>Date / Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req, index) => (
                        <tr key={req._id}>
                            <td>{index + 1}</td>
                            <td>{req.requester_name}</td>
                            <td>{req.requester_email}</td>
                            <td>{req.requester_district} / {req.requester_upazila}</td>
                            <td>{req.hospitalName}</td>
                            <td>{req.bloodGroup}</td>
                            <td>{req.donationDate} / {req.donationTime}</td>
                            <td>{req.donation_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequestsAdmin;
