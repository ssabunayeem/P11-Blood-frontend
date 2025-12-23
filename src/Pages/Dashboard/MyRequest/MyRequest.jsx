import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const size = 10;

  const fetchRequests = () => {
    axiosSecure
      .get(`/my-request?page=${page}&size=${size}&status=${status}`)
      .then((res) => {
        setRequests(res.data.request);
        setTotal(res.data.totalRequest);
      })
      .catch(() => toast.error("Failed to load requests"));
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user, status, page]);

  const handleStatusUpdate = (id, nextStatus) => {
    axiosSecure
      .patch(`/requests/update/status/${id}`, { status: nextStatus })
      .then(() => {
        toast.success("Status updated");
        fetchRequests();
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this request?")) return;
    axiosSecure.delete(`/requests/${id}`).then(() => {
      toast.success("Deleted");
      fetchRequests();
    });
  };

  const pages = Math.ceil(total / size);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">My Donation Requests</h2>

        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(0);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="cancel">Canceled</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Hospital</th>
            <th>Blood</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, i) => (
            <tr key={req._id}>
              <td>{i + 1 + page * size}</td>
              <td>{req.hospitalName}</td>
              <td>{req.bloodGroup}</td>
              <td>
                <span className="badge">{req.donation_status}</span>
              </td>
              <td className="space-x-1">
                {req.donation_status === "pending" && (
                  <button
                    className="btn btn-xs"
                    onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
                  >
                    Edit
                  </button>
                )}
                {(req.donation_status === "pending" ||
                  req.donation_status === "cancel") && (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        {[...Array(pages).keys()].map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`btn btn-sm ${p === page && "btn-primary"}`}
          >
            {p + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyRequest;
