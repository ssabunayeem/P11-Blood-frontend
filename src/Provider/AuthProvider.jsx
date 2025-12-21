import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import auth from "./../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [role, setRole] = useState("");

  const [userStatus, setUserStatus] = useState("");

  const googleProvider = new GoogleAuthProvider();

  const registerWithEmailPassword = (email, pass) => {
    console.log(email, pass);

    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:5000/users/role/${user.email}`).then((res) => {
      setRole(res.data.role);
      setUserStatus(res.data.status);
      setRoleLoading(false);
    });
  }, [user]);
  console.log(role);

  const authData = {
    registerWithEmailPassword,
    setUser,
    user,
    handleGoogleSignIn,
    loading,
    role,
    roleLoading,
    userStatus,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
