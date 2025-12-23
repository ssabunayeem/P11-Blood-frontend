import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, setUser } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");
  const [loading, setLoading] = useState(false);

  // Load districts and upazilas
  useEffect(() => {
    axios.get("./upazila.json").then((res) => setUpazilas(res.data.upazilas));
    axios.get("./district.json").then((res) => setDistricts(res.data.districts));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const bloodGroup = e.target.BloodGroup.value;
    const photoFile = e.target.photoUrl.files[0];

    // Validation
    if (pass.length < 6) return toast.error("Password must be at least 6 characters");
    if (!/[A-Z]/.test(pass)) return toast.error("Password must contain an uppercase letter");
    if (!/[a-z]/.test(pass)) return toast.error("Password must contain a lowercase letter");
    if (!photoFile) return toast.error("Please upload a photo");

    try {
      setLoading(true);
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", photoFile);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=f57dd31b60f91b1c6b01c96eab4a817f`,
        formData
      );

      const photoURL = res.data.data.display_url;

      // Register user with Firebase
      const userCredential = await registerWithEmailPassword(email, pass);
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      setUser(userCredential.user);

      // Send user data to backend
      await axios.post("http://localhost:5000/users", {
        email,
        name,
        bloodGroup,
        district,
        upozila,
        photoURL,
      });

      toast.success("Registered successfully!");
      e.target.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8 md:p-12">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Register at YIM BloodBank</h1>
          <p className="text-gray-500 text-sm">
            Create your account and start saving lives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />

          {/* Photo */}
          <input
            type="file"
            name="photoUrl"
            accept="image/*"
            className="w-full input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />

          {/* Blood Group */}
          <select
            name="BloodGroup"
            className="w-full select border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          >
            <option disabled selected>
              Choose Blood Group
            </option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full select border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          >
            <option disabled selected value="">
              District Name
            </option>
            {districts.map((d) => (
              <option key={d?.id} value={d?.name}>
                {d?.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            value={upozila}
            onChange={(e) => setUpozila(e.target.value)}
            className="w-full select border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          >
            <option disabled selected value="">
              Upazila Name
            </option>
            {upazilas.map((u) => (
              <option key={u?.id} value={u?.name}>
                {u?.name}
              </option>
            ))}
          </select>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>


        {/* Login Link */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
