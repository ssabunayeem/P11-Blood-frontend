import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHeartbeat, FaTint } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("../upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("../district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      requester_name: user?.displayName,
      requester_email: user?.email,
      requester_district: form.requester_district.value,
      requester_upazila: form.requester_upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      donation_status: "pending",
      createdAt: new Date(),
    };

    axiosSecure.post("/requests", formData).then(() => {
      alert("🩸 Blood request submitted successfully!");
      form.reset();
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto p-8 rounded-2xl shadow-xl
                 bg-gradient-to-br from-red-50 via-white to-red-100
                 border border-red-100"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex justify-center mb-3 text-red-500 text-4xl"
        >
          <FaHeartbeat />
        </motion.div>

        <h2 className="text-3xl font-bold text-red-600">
          Blood Donation Request
        </h2>
        <p className="text-gray-500 mt-2">
          A single donation can save multiple lives
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleRequest} className="space-y-5">
        {/* User Info */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
          <input
            value={user?.displayName}
            readOnly
            className="input input-bordered bg-gray-100 focus:border-red-400"
          />
          <input
            value={user?.email}
            readOnly
            className="input input-bordered bg-gray-100 focus:border-red-400"
          />
        </motion.div>

        {/* Recipient */}
        <motion.input
          variants={itemVariants}
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          required
          className="input input-bordered w-full focus:border-red-400"
        />

        {/* Location */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
          <select
            name="requester_district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select select-bordered focus:border-red-400"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            name="requester_upazila"
            value={upozila}
            onChange={(e) => setUpozila(e.target.value)}
            className="select select-bordered focus:border-red-400"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </motion.div>

        {/* Hospital */}
        <motion.input
          variants={itemVariants}
          name="hospitalName"
          placeholder="Hospital Name"
          required
          className="input input-bordered w-full focus:border-red-400"
        />

        <motion.input
          variants={itemVariants}
          name="fullAddress"
          placeholder="Full Address"
          required
          className="input input-bordered w-full focus:border-red-400"
        />

        {/* Blood Group */}
        <motion.select
          variants={itemVariants}
          name="bloodGroup"
          required
          className="select select-bordered w-full focus:border-red-500"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </motion.select>

        {/* Date & Time */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
          <input type="date" name="donationDate" required className="input input-bordered" />
          <input type="time" name="donationTime" required className="input input-bordered" />
        </motion.div>

        {/* Message */}
        <motion.textarea
          variants={itemVariants}
          name="requestMessage"
          placeholder="Explain why blood is needed"
          required
          className="textarea textarea-bordered w-full h-28 focus:border-red-400"
        />

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn w-full text-white text-lg
                     bg-gradient-to-r from-red-500 to-rose-600
                     hover:from-red-600 hover:to-rose-700
                     shadow-lg"
        >
          <FaTint className="mr-2" />
          Submit Blood Request
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddRequest;
