import React, { useContext, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";
import auth from "../../../firebase/firebase.config";
import axios from "axios";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const [profile, setProfile] = useState(null);
    const [preview, setPreview] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    console.log("Nayeem", isEdit);


    // Dropdown data
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    // Fetch profile from backend
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/users/role/${user.email}`)
            .then(res => {
                setProfile(res.data);
                setPreview(res.data?.photoURL || user?.photoURL);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to load profile");
            });
    }, [user?.email]);

    // Fetch districts and upazilas
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const [districtRes, upazilaRes] = await Promise.all([
                    axios.get("/district.json"),
                    axios.get("/upazila.json")
                ]);
                setDistricts(districtRes.data.districts);
                setUpazilas(upazilaRes.data.upazilas);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load location data");
            }
        };
        fetchLocations();
    }, []);

    if (!profile) return <div className="text-center py-10">Loading profile...</div>;

    // Image preview handler
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPreview(URL.createObjectURL(file));
        setProfile({ ...profile, _newImage: file });
    };

    // Save profile
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            let photoURL = profile.photoURL;

            // Upload new image to imgbb
            if (profile._newImage) {
                const formData = new FormData();
                formData.append("image", profile._newImage);

                const imgRes = await fetch(
                    "https://api.imgbb.com/1/upload?key=f57dd31b60f91b1c6b01c96eab4a817f",
                    { method: "POST", body: formData }
                ).then(res => res.json());

                photoURL = imgRes.data.display_url;
            }

            // Update Firebase Auth profile
            await updateProfile(auth.currentUser, {
                displayName: profile.name,
                photoURL,
            });

            // Update backend
            await axiosSecure.patch(`/update/profile?email=${profile.email}`, {
                name: profile.name,
                phone: profile.phone,
                age: profile.age,
                gender: profile.gender,
                address: profile.address,
                bloodGroup: profile.bloodGroup,
                district: profile.district,
                upozila: profile.upozila,
                photoURL,
            });

            toast.success("Profile updated successfully!");
            // setIsEdit(false);
        } catch (err) {
            console.error(err);
            toast.error("Profile update failed!");
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-xl rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 border-l-8 border-red-600"
            >
                <img
                    src={preview}
                    alt="profile"
                    className="w-32 h-32 rounded-full border-4 border-red-500 object-cover"
                />
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-red-600">{profile.name}</h2>
                    <p className="text-gray-700">{profile.email}</p>
                    <p className="mt-2 text-sm">
                        Blood Group: <span className="font-semibold text-red-500">{profile.bloodGroup}</span>
                    </p>
                </div>
            </motion.div>

            {/* Editable Form */}
            <motion.form
                onSubmit={handleSave}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 bg-white shadow-lg rounded-xl p-6 space-y-4"
            >
                {/* Name & Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            disabled={!isEdit}
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="input input-bordered w-full disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <input
                            type="text"
                            disabled={!isEdit}
                            value={profile.phone || ""}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="input input-bordered w-full disabled:bg-gray-100"
                        />
                    </div>
                </div>

                {/* Age & Gender */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Age</label>
                        <input
                            type="number"
                            disabled={!isEdit}
                            value={profile.age || ""}
                            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                            className="input input-bordered w-full disabled:bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Gender</label>
                        <select
                            disabled={!isEdit}
                            value={profile.gender || ""}
                            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            className="select select-bordered w-full disabled:bg-gray-100"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        type="text"
                        disabled={!isEdit}
                        value={profile.address || ""}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        className="input input-bordered w-full disabled:bg-gray-100"
                    />
                </div>

                {/* Blood Group, District & Upozila */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">Blood Group</label>
                        <select
                            disabled={!isEdit}
                            value={profile.bloodGroup || ""}
                            onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value })}
                            className="select select-bordered w-full disabled:bg-gray-100"
                        >
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">District</label>
                        <select
                            disabled={!isEdit}
                            value={profile.district || ""}
                            onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                            className="select select-bordered w-full disabled:bg-gray-100"
                        >
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.name}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Upozila</label>
                        <select
                            disabled={!isEdit}
                            value={profile.upozila || ""}
                            onChange={(e) => setProfile({ ...profile, upozila: e.target.value })}
                            className="select select-bordered w-full disabled:bg-gray-100"
                        >
                            <option value="">Select Upozila</option>
                            {upazilas.map(u => (
                                <option key={u.id} value={u.name}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Profile Image */}
                <div>
                    <label className="block mb-1 font-medium">Profile Image</label>
                    <input
                        type="file"
                        disabled={!isEdit}
                        onChange={handleImage}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    {!isEdit ? (
                        <button
                            type="button"
                            onClick={() => setIsEdit(true)}
                            className="btn bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="btn bg-green-600 text-white hover:bg-green-700 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEdit(false)}
                                className="btn btn-outline border-gray-400 hover:border-gray-600"
                            >
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </motion.form>
        </div>
    );
};

export default Profile;
