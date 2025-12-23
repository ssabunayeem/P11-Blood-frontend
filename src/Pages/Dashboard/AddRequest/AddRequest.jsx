import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";
import toast from "react-hot-toast";
import axios from "axios";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    axios.get("/district.json").then(res => setDistricts(res.data.districts));
    axios.get("/upazila.json").then(res => setUpazilas(res.data.upazilas));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      requester_name: user.displayName,
      requester_email: user.email,
      requester_district: form.district.value,
      requester_upazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.message.value,
    };

    try {
      await axiosSecure.post("/requests", requestData);
      toast.success("Donation request created 🩸");
      form.reset();
    } catch {
      toast.error("Failed to create request");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-xl space-y-4">
      <input value={user.displayName} readOnly className="input w-full bg-gray-100" />
      <input value={user.email} readOnly className="input w-full bg-gray-100" />

      <select name="district" required className="select w-full">
        <option value="">Select District</option>
        {districts.map(d => <option key={d.id}>{d.name}</option>)}
      </select>

      <select name="upazila" required className="select w-full">
        <option value="">Select Upazila</option>
        {upazilas.map(u => <option key={u.id}>{u.name}</option>)}
      </select>

      <input name="hospitalName" placeholder="Hospital Name" className="input w-full" required />
      <input name="fullAddress" placeholder="Full Address" className="input w-full" required />

      <select name="bloodGroup" required className="select w-full">
        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg =>
          <option key={bg}>{bg}</option>
        )}
      </select>

      <input type="date" name="donationDate" required className="input w-full" />
      <input type="time" name="donationTime" required className="input w-full" />

      <textarea name="message" className="textarea w-full" required />

      <button className="btn btn-secondary w-full">Create Request</button>
    </form>
  );
};

export default AddRequest;
