import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../firebase/firebase.config';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    const { setUser, handleGoogleSignin } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;


        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user)
                navigate(location.state)
            })
            .catch((error) => {
                console.log(error);

            });


    }


    const googleSignin = () => {
        handleGoogleSignin()
            .then(result => {
                const user = result.user
                setUser(user)
                navigate(location.state ? location.state : '/')
            })
            .catch(err => console.log(err))
    }

    // console.log(user);


    const handleForget = () => {
        navigate(`/forget/${email}`)

    }


    return (
        <div className='flex flex-col  gap-5 justify-center items-center p-7'>


            <div className='bg-rose-700 text-center shadow-2xl p-5 md:p-15 rounded-full'>

                <div className='bg-linear-to-r from-cyan-300 via-white to-sky-400 bg-clip-text text-transparent'>
                    <a className="text-2xl lg:text-4xl font-bold">Blood Donation</a>
                </div>

                <p className='text-white p-0 m-0 mt-5 text-lg'>don't have a account</p>

                <div className="text-lg lg:text-xl text-white font-bold underline">
                    <Link to={'/signup'}>Register now!</Link>
                </div>

            </div>

            <div className="card bg-rose-300 w-87.5 md:w-162.5 md:p-8 shrink-0 shadow-2xl rounded-4xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="fieldset">

                        <label className="label text-lg">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="input w-full py-6 text-lg rounded-full"
                            placeholder="Email" />

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


                        <div><button onClick={handleForget} className="link link-hover text-lg text-red-700">Forgot password?</button></div>

                        <button className="btn btn-neutral rounded-xl bg-[#6F00FF] py-6 text-lg">Login</button>


                        <p className='text-base mt-2'>Sign in With... </p>

                        <button onClick={googleSignin} className="btn py-6 text-lg text-gray-500 rounded-full"><FcGoogle />Google </button>

                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;