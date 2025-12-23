import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const AllRequestsPublic = () => {
    const axiosInstance = useAxios();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/pending-requests")
            .then((res) => setRequests(res.data))
            .catch((err) => console.error(err));
    }, [axiosInstance]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">All Pending Donation Requests</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Blood Group</th>
                            <th>Date/Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req, i) => (
                            <tr key={req._id}>
                                <td>{i + 1}</td>
                                <td>{req.requester_name}</td>
                                <td>
                                    {req.requester_district}, {req.requester_upazila}
                                </td>
                                <td>{req.bloodGroup}</td>
                                <td>
                                    {req.donationDate} / {req.donationTime}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            navigate(`/donation-request/${req._id}`)
                                        }
                                        className="btn  btn-primary bg-rose-800"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllRequestsPublic;
