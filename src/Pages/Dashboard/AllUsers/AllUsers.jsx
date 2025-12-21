import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecqure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const fetchUser = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };
  useEffect(() => {
    fetchUser();
  }, [axiosSecure]);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status} `)
      .then((res) => {
        console.log(res.data);
        fetchUser();
      });
  };

  return (
    <div>
      {" "}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label></label>
              </th>
              <th>Name</th>
              <th> Address & Email</th>
              <th> User Status</th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user) => (
              <tr>
                <th>
                  <label></label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.mainUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.district}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.email}
                  </span>
                </td>
                <td>{user?.status}</td>
                <th>
                  {user?.status == "active" ? (
                    <button
                      onClick={() => handleStatusChange(user?.email, "blocked")}
                      className="btn btn-dash btn-error btn-xs mr-2"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(user?.email, "active")}
                      className="btn btn-dash btn-accent btn-xs"
                    >
                      Active
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
