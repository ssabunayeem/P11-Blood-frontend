import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import auth from "../firebase/firebase.config";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      const user = userCredential.user;
      setUser(user);
      toast.success("Login Successful!");
      navigate(location.state ? location.state : "/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 md:p-12">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Login to YIM BloodBank</h1>
          <p className="text-gray-500 text-sm">Access your dashboard and donate blood</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
            />
            <button
              type="button"
              onClick={handleForget}
              className="text-sm text-red-600 hover:underline mt-1 self-start"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Optional: Register */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-600 font-medium hover:underline">
            Register
          </Link>
        </div>

        {/* Optional: Google Sign-In */}
        {/* <button
          onClick={googleSignIn}
          className="flex items-center justify-center mt-4 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2" /> Login with Google
        </button> */}
      </div>
    </div>
  );
};

export default Login;
