import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;

    try {
      const res = await axiosInstance.get(
        `/requests-search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upozila}`
      );
      console.log(res.data);
      // TODO: Set results in state or pass to parent
    } catch (err) {
      console.error(err);
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
    <div className="max-w-4xl mx-auto p-4">
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
          required
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
          required
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
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchRequest;
