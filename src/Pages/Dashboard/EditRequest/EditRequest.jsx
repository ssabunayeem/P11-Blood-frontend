import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";

const EditRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { id } = useParams();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);

    // load district & upazila json + request data
    useEffect(() => {
        axios.get("/district.json")
            .then((res) => setDistricts(res.data.districts))
            .catch((err) => console.error("district load failed", err));

        axios.get("/upazila.json")
            .then((res) => setUpazilas(res.data.upazilas))
            .catch((err) => console.error("upazila load failed", err));

        axiosSecure.get(`/requests/${id}`)
            .then((res) => {
                const data = res.data;

                if (data.requester_email !== user.email) {
                    toast.error("Unauthorized access!");
                    navigate("/dashboard/my-request");
                    return;
                }

                setFormData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load request");
            });

    }, [id, user, axiosSecure, navigate]);

    // update upazila list when district changes
    useEffect(() => {
        if (formData && upazilas.length > 0) {
            const districtObj = districts.find(
                (d) => d.name === formData.requester_district
            );

            if (districtObj) {
                const filtered = upazilas.filter(
                    (u) => u.district_id === districtObj.id
                );
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFilteredUpazilas(filtered);
            }
        }
    }, [formData, upazilas, districts]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "requester_district") {
            const districtObj = districts.find((d) => d.name === value);
            if (districtObj) {
                const filtered = upazilas.filter(
                    (u) => u.district_id === districtObj.id
                );
                setFilteredUpazilas(filtered);
            }

            setFormData((prev) => ({ ...prev, requester_upazila: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosSecure.patch(`/requests/edit/${id}`, formData)
            .then(() => {
                toast.success("Request updated successfully!");
                navigate("/dashboard/my-request");
            })
            .catch(() => toast.error("Update failed!"));
    };

    if (loading || !formData) {
        return <p className="text-center py-10">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg">
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
                Edit Donation Request
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium mb-1">Recipient Name</label>
                    <input
                        type="text"
                        name="requester_name"
                        value={formData.requester_name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                    {/* district */}
                    <select
                        name="requester_district"
                        value={formData.requester_district}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>

                    {/* upazila (filtered) */}
                    <select
                        name="requester_upazila"
                        value={formData.requester_upazila}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Upazila</option>
                        {filteredUpazilas.map((u) => (
                            <option key={u.id} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </select>

                </div>

                {/* hospital & address */}
                <div>
                    <label className="block font-medium mb-1">Hospital Name</label>
                    <input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Full Address</label>
                    <input
                        type="text"
                        name="fullAddress"
                        value={formData.fullAddress}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>

                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="donationDate"
                        value={formData.donationDate}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="time"
                        name="donationTime"
                        value={formData.donationTime}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <textarea
                    name="requestMessage"
                    value={formData.requestMessage}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full h-28"
                    placeholder="Explain why blood is needed"
                    required
                />

                <button type="submit" className="btn bg-red-600 text-white w-full">
                    Update Request
                </button>
            </form>

        </div>
    );
};

export default EditRequest;
