import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";

const MyRequest = () => {
  const [myRequest, setMyRequest] = useState([]);

  const [totalRequest, setTotalRequest] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);
  const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
  const page = [...Array(numberOfPage).keys()].map((e) => e + 1);

  // console.log(myRequest);
  // console.log(totalRequest);
  // console.log(page);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < page.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Req No</th>
              <th>Name</th>
              <th>Hospital Name</th>
              <th> Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {myRequest.map((request, index) => (
              <tr>
                <th>{currentPage * 10 + (index + 1) - 10}</th>
                <td>{request.requester_name} </td>
                <td>{request.hospitalName} </td>
                <td>{request.bloodGroup} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-12 gap-4">
        <button onClick={handlePrev} className="btn mr-4">
          Pev
        </button>
        {page.map((p) => (
          <button
            onClick={() => setCurrentPage(p)}
            className={`btn mr-4 ${
              p === currentPage ? "bg-[#435585] text-white" : ""
            }`}
          >
            {p}
          </button>
        ))}
        <button onClick={handleNext} className="btn ml-4">
          Next
        </button>
      </div>
    </div>
  );
};

export default MyRequest;
