import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = useAxios();

  // ================= Fetch Districts & Upazilas =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [upazilaRes, districtRes] = await Promise.all([
          axios.get("/upazila.json"),
          axios.get("/district.json"),
        ]);

        setUpazilas(upazilaRes.data.upazilas);
        setDistricts(districtRes.data.districts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load location data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= Handle Search =================
  const handleSearch = async (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    if (!bloodGroup) {
      alert("Please select a blood group");
      return;
    }

    try {
      setSearching(true);
      setError(null);

      const res = await axiosInstance.get(
        `/requests-search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upozila}`
      );

      setResults(res.data);
      setSearching(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch search results.");
      setSearching(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-gray-300"></span>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center py-6">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* ================= Search Form ================= */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 items-center bg-white shadow-md rounded-xl p-6"
      >
        {/* Blood Group */}
        <select
          name="blood"
          required
          className="select w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition"
        >
          <option value="">Choose Blood Group</option>
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
          className="select w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          value={upozila}
          onChange={(e) => setUpozila(e.target.value)}
          className="select w-full md:w-1/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition"
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg shadow transition"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* ================= Search Results ================= */}
      <div className="mt-6">
        {results.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            {searching ? "" : "No requests found."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((req) => (
              <div
                key={req._id}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col gap-2"
              >
                <h3 className="font-bold text-lg text-red-600">
                  {req.requester_name || "Unknown"}
                </h3>
                <p>
                  <span className="font-semibold">Blood Group:</span>{" "}
                  {req.bloodGroup}
                </p>
                <p>
                  <span className="font-semibold">District:</span>{" "}
                  {req.requester_district}
                </p>
                <p>
                  <span className="font-semibold">Upazila:</span>{" "}
                  {req.requester_upazila}
                </p>
                <p>
                  <span className="font-semibold">Hospital:</span>{" "}
                  {req.hospitalName || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Requested At:{" "}
                  {req.createdAt
                    ? new Date(req.createdAt).toLocaleDateString("en-GB")
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRequest;
