"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/signin.css";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://www.beqachokoshvili.com/api/auth",
        {
          username: email,
          password: password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", "xoaskdkao");
        router.push("/admin");
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) return;

    router.push("/admin");
  }, []);

  return (
    <div className="signin-container">
      <div className="signin">
        <div>
          <h3 className="admin-panel">ADMIN PANEL</h3>
        </div>
        <input
          type="email"
          name="email"
          className="signin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          className="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button onClick={handleSignIn}>Sign In</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default SignIn;
