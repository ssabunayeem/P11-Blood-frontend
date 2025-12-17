import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { FcGoogle } from "react-icons/fc";
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from 'axios';




const Register = () => {

    const { registerWithEmailPassword, setUser, user, handleGoogleSignin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl;
        const file = photoUrl.files[0];
        console.log(file);


        console.log(name, photoUrl);

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (pass.length < 6) {
            return toast("less than 6 character")
        }
        if (!uppercase.test(pass)) {
            return toast("need a Uppercase")
        }
        if (!lowercase.test(pass)) {
            return toast("need a lowercase")
        }



        const res = await axios.post(`https://api.imgbb.com/1/upload?&key=f57dd31b60f91b1c6b01c96eab4a817f`, { image: file },
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        const mainPhotoUrl = res.data.data.display_url;


        if (res.data.success == true) {
            registerWithEmailPassword(email, pass)
                .then((userCredential) => {

                    updateProfile(auth.currentUser, {
                        displayName: name, photoURL: mainPhotoUrl
                    }).then(() => {
                        setUser(userCredential.user)
                    }).catch((error) => {
                        console.log(error)
                    });


                }).catch(err => {
                    console.log(err);

                })

        }

    }


    console.log(user)


    const googleSignup = () => {
        handleGoogleSignin()
            .then(result => {
                const user = result.user
                setUser(user)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='flex flex-col  gap-5 justify-center items-center p-7'>


                <div className='bg-rose-700 text-center shadow-2xl p-5 md:px-15 md:py-10 rounded-t-full rounded-b-3xl'>
                    <div className='bg-linear-to-r from-cyan-300 via-white to-sky-400 bg-clip-text text-transparent'>
                        <a className="text-2xl lg:text-4xl font-bold">Blood Donation</a>
                    </div>

                </div>

                <div className="card bg-rose-300 w-[350px] md:w-[650px] md:p-8 shrink-0 shadow-2xl rounded-4xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="fieldset">

                            <label className="label text-lg">Name</label>
                            <input name='name' type="text" className="input w-full py-6 text-lg rounded-full" placeholder="Your Name" />

                            <label className="label text-lg">PhotoUrl</label>
                            <input name='photoUrl' type="file" className="input w-full pt-2  rounded-full" placeholder="" />

                            <label className="label text-lg">Email</label>
                            <input name='email' type="email" className="input w-full py-6 text-lg rounded-full" placeholder="Email" />

                            <label className="label text-lg">Password</label>
                            <div className="relative">
                                <input
                                    name='password'
                                    type={showPassword ? "text" : "password"}
                                    className="input w-full py-6 text-lg rounded-full pr-16"
                                    placeholder="Password"
                                />

                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
                                >
                                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}

                                </span>
                            </div>

                            <button className="btn btn-neutral rounded-xl bg-[#6F00FF] mt-4 py-6 text-lg">Register</button>
                            <Toaster
                                toastOptions={{
                                    style: {
                                        fontSize: '28px',     // text-5xl এর মতো
                                        padding: '20px',      // p-5 এর মতো
                                        borderRadius: '12px',
                                    },
                                }}
                            />
                            <p className='text-base mt-2'>Sign up With... </p>

                            <button onClick={googleSignup} className="btn py-6 text-lg text-gray-500 rounded-full"><FcGoogle />Google </button>


                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;