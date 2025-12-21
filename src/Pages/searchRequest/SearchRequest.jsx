import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const SearchRequest = () => {
  const [upazilas, setUpazilas] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [district, setDistrict] = useState("");

  const [upozila, setUpozila] = useState("");

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("./upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);
  console.log(upazilas);

  const handleSearch = (e) => {
    e.preventDefault();
    const bloodGroup = e.target.blood.value;
    console.log(bloodGroup);

    axiosInstance
      .get(
        `/requests-search?bloodGroup=${bloodGroup}&district=${district}&upazila=${upozila}`
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="fieldset flex">
        <select
          name="blood"
          defaultValue="Choose Blood Group"
          className="select"
        >
          <option disabled={true}>Choose Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB-">AB-</option>
          <option value="AB+">AB+</option>
        </select>

        <select
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
        <button className="btn">Search</button>
      </form>
    </div>
  );
};

export default SearchRequest;
