import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const notify = () => toast(" Successfully Registerd.");
const Register = () => {

  /*  const { registerWithEmailPassword, user, setUser, handleGoogleSignIn } =
     useContext(AuthContext); */

  const { registerWithEmailPassword, user, setUser } =
    useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);

  const [districts, setDistricts] = useState([]);

  const [district, setDistrict] = useState("");

  const [upozila, setUpozila] = useState("");

  useEffect(() => {
    axios.get("./upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);
  console.log(upazilas);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photourl = e.target.photoUrl;
    const BloodGroup = e.target.BloodGroup.value;

    const file = photourl.files[0];
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      return alert("less than 6 characters");
    }
    if (!uppercase.test(pass)) {
      return alert("Need a UpperCase");
    }
    if (!lowercase.test(pass)) {
      return alert("Need a Lower Case");
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=f57dd31b60f91b1c6b01c96eab4a817f`,
      { image: file },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    const mainUrl = res.data.data.display_url;

    const formData = {
      email,
      pass,
      name,
      mainUrl,
      BloodGroup,
      district,
      upozila,
    };

    if (res.data.success == true) {
      registerWithEmailPassword(email, pass)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: mainUrl,
          })
            .then(() => {
              setUser(userCredential.user);
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const googleSignUp = () => {
  //   handleGoogleSignIn()
  //     .then((result) => {
  //       const user = result.user;
  //       setUser(user);
  //     })
  //     .catch((err) => console.log(err));
  // };

  console.log(user);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-100 max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handelSubmit} className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Your Name"
                />
                <label className="label">PhotoURL</label>
                <input
                  name="photoUrl"
                  type="file"
                  className="input"
                  placeholder="Your PhotoUrl"
                />
                <select
                  name="BloodGroup"
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

                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                {/* <div>
                  <a className="link link-hover">Forgot password?</a>
                </div> */}
                {/* <button onClick={googleSignUp} className="btn  ">
                  <FcGoogle />Go o g l e
                </button> */}
                <div>
                  <span>Already have an account? </span>
                  <Link className="text-blue-500 font-medium" to="/login">
                    Login
                  </Link>
                </div>
                <button onClick={notify} className="btn btn-neutral mt-4">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
