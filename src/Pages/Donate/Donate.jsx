import React, { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();

    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donorEmail,
      donateAmount,
      donorName,
    };

    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-red-300">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">
          Support YIM Blood Donation
        </h2>

        {user && (
          <p className="text-gray-700 mb-4 text-center">
            Welcome, <span className="font-semibold">{user.displayName}</span>! 💖
          </p>
        )}

        <form onSubmit={handleCheckout} className="flex flex-col gap-5">
          <label className="flex flex-col text-gray-700 font-medium">
            Donation Amount (USD)
            <input
              name="donateAmount"
              type="number"
              min="1"
              placeholder="Enter amount"
              className="mt-2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-500 transition"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-red-700 transition transform hover:scale-105"
          >
            Donate Now 🤍
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-6 text-center">
          Your contribution saves lives. Thank you for supporting YIM Blood Donation.
        </p>
      </div>
    </div>
  );
};

export default Donate;
