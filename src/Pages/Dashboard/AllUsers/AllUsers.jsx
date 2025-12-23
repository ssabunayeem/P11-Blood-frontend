import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState({}); // { email: "", name: "", mainUrl: "" }

  // ================= Fetch all users =================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // ================= Update user status =================
  const handleStatusChange = async (email, newStatus) => {
    try {
      await axiosSecure.patch("/update/user/status", { email, status: newStatus });
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ================= Update user profile =================
  const handleProfileUpdate = async (email) => {
    try {
      const { name, mainUrl } = editUser[email];
      await axiosSecure.patch("/update/profile", { name, photoURL: mainUrl }, { params: { email } });

      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, name, mainUrl } : u))
      );

      setEditUser((prev) => ({ ...prev, [email]: null })); // reset edit state
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // ================= Render =================
  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto backdrop-blur-md bg-rose-400/10 p-4 rounded-2xl shadow-lg ">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Name & Role</th>
                <th className="p-2">Address & Email</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {users?.map((user, index) => {
                const isEditing = editUser[user.email] !== undefined;
                return (
                  <tr
                    key={user._id || user.email}
                    className="hover:bg-white/30 transition-colors"
                  >
                    <td className="p-2">{index + 1}</td>

                    {/* Name & Role */}
                    <td className="p-2 flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 border border-gray-300">
                          <img
                            src={user.mainUrl || "/default-avatar.png"}
                            alt={user.name || "Avatar"}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editUser[user.email].name}
                            onChange={(e) =>
                              setEditUser((prev) => ({
                                ...prev,
                                [user.email]: { ...prev[user.email], name: e.target.value },
                              }))
                            }
                            className="border rounded px-2 py-1 text-sm"
                          />
                        ) : (
                          <span className="font-bold">{user.name || "No Name"}</span>
                        )}
                        <span className="text-xs opacity-60">{user.role}</span>
                      </div>
                    </td>

                    {/* Address & Email */}
                    <td className="p-2">
                      {user.district || "N/A"}
                      <br />
                      <span className="badge badge-ghost badge-sm">{user.email}</span>
                    </td>

                    {/* Status */}
                    <td className="p-2">{user.status || "inactive"}</td>

                    {/* Action */}
                    <td className="p-2 flex gap-2">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleStatusChange(user.email, "blocked")}
                          className="btn btn-error btn-xs"
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(user.email, "active")}
                          className="btn btn-accent btn-xs"
                        >
                          Activate
                        </button>
                      )}

                      {isEditing ? (
                        <button
                          onClick={() => handleProfileUpdate(user.email)}
                          className="btn btn-success btn-xs"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            setEditUser((prev) => ({ ...prev, [user.email]: { name: user.name || "", mainUrl: user.mainUrl || "" } }))
                          }
                          className="btn btn-primary btn-xs"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
