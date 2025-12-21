import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [district, setDistrict] = useState("");

  const [upozila, setUpozila] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("../upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("../district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const requester_name = form.recipientName.value;
    const requester_email = form.requester_email.value;
    const requester_district = form.requester_district.value;
    const requester_upazila = form.requester_upazila.value;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const bloodGroup = form.bloodGroup.value;
    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;

    const formData = {
      requester_name,
      requester_email,
      requester_district,
      requester_upazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      donation_status: "pending",
    };

    axiosSecure
      .post("/requests", formData)
      .then((res) => {
        alert(res.data.insertedId);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Blood Donation Request Form
      </h2>

      <form onSubmit={handleRequest} className="space-y-4">
        {/* Requester Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={user?.displayName}
            type="text"
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />

          <input
            name="requester_email"
            value={user?.email}
            type="email"
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Recipient Info */}
        <input
          type="text"
          name="recipientName"
          placeholder="Recipient Name"
          required
          className="input input-bordered w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="requester_district"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
            className="select"
          >
            <option disabled selected value="">
              District Name
            </option>
            {districts.map((d) => (
              <option value={d?.name} key={d?.id}>
                {d?.name}
              </option>
            ))}
          </select>

          <select
            name="requester_upazila"
            value={upozila}
            onChange={(e) => {
              setUpozila(e.target.value);
            }}
            className="select"
          >
            <option disabled selected value="">
              Upazila Name
            </option>
            {upazilas.map((u) => (
              <option value={u?.name} key={u?.id}>
                {u?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital & Address */}
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="fullAddress"
          placeholder="Full Address"
          required
          className="input input-bordered w-full"
        />

        {/* Blood Group */}
        <select
          name="bloodGroup"
          required
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
          <option value="AB+">AB+</option>
        </select>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="donationDate"
            required
            className="input input-bordered w-full"
          />

          <input
            type="time"
            name="donationTime"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Message */}
        <textarea
          name="requestMessage"
          placeholder="Explain why blood is needed"
          required
          className="textarea textarea-bordered w-full h-32"
        />

        {/* Submit */}
        <button type="submit" className="btn btn-secondary w-full">
          Request
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
