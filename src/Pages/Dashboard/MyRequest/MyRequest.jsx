import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

const MyRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

  const fetchRequests = () => {
    axiosSecure
      .get(`/my-request?email=${user.email}&page=0&size=100`)
      .then((res) => {
        setRequests(res.data.request);
      })
      .catch(() => toast.error("Failed to load requests"));
  };

  useEffect(() => {
    if (user?.email) fetchRequests();
  }, [user]);

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    axiosSecure.delete(`/requests/${id}`).then(() => {
      toast.success("Deleted successfully");
      fetchRequests();
    });
  };

  const handleStatusUpdate = (id, nextStatus) => {
    axiosSecure
      .patch(`/requests/update/status/${id}`, { status: nextStatus })
      .then(() => {
        toast.success("Status updated");
        fetchRequests();
      })
      .catch(() => toast.error("Update failed"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">My Donation Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Hospital</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, i) => (
              <tr key={req._id}>
                <td>{i + 1}</td>
                <td>{req.hospitalName}</td>
                <td>{req.bloodGroup}</td>
                <td>
                  <span className={`badge ${req.donation_status === "pending"
                    ? "badge-warning"
                    : req.donation_status === "inprogress"
                      ? "badge-info"
                      : req.donation_status === "done"
                        ? "badge-success"
                        : "badge-error"
                    }`}>
                    {req.donation_status}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/edit-request/${req._id}`)}
                    className="btn btn-xs  bg-rose-300"
                  >
                    Edit
                  </button>
                </td>

                <td className="space-x-2">
                  {/* Pending → inprogress */}
                  {req.donation_status === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(req._id, "inprogress")
                      }
                      className="btn btn-xs btn-primary"
                    >
                      Start
                    </button>
                  )}

                  {/* inprogress → done */}
                  {req.donation_status === "inprogress" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusUpdate(req._id, "done")
                        }
                        className="btn btn-xs btn-success"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(req._id, "cancel")
                        }
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  )}



                  {/* Delete always allowed (pending or cancelled) */}
                  {(req.donation_status === "pending" ||
                    req.donation_status === "cancel") && (
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                    )}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequest;
