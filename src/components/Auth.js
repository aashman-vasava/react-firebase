import { auth, googleAuth } from "../config/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  console.log(auth?.currentUser?.email);
  const signIN = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
    } catch (err) {
      console.error(err);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.error(err);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        placeholder="email"
        type="email"
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <input
        placeholder="password"
        type="password"
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <button onClick={signIN}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with google</button>
      <button onClick={logout}>SignOut</button>
    </div>
  );
};
