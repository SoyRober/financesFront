import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import fetchData from "../utils/fetchData";
import { useNotification } from "../context/NotificationContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const { notify } = useNotification();
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      notify("Please fill in all fields", "info");
      return;
    }

    try {
      const response = await fetchData("/public/login", "POST", {
        username: username,
        password: password,
      });

      if (response.success) {
        localStorage.setItem("token", response.message);
        notify("Logged in successfully", "success");
        navigate("/dashboard/overview");
      } else {
        notify(response.message, "error");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      notify(error instanceof Error && error.message ? error.message : "Error while logging in", "error");
    }
  };

  return (
    <div className="p-20 flex items-center justify-center bg-neutral-900">
      <div className="max-w-md w-full bg-neutral-900 border border-primary-500 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-neutral-50 mb-6">
          Log in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-neutral-50 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-primary-500 rounded-lg bg-neutral-900 text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoComplete="username"
              placeholder="Type your username"
            />
          </div>
          <div>
            <label className="block text-neutral-50 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-primary-500 rounded-lg bg-neutral-900 text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              autoComplete="current-password"
              placeholder="Type your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary-500 hover:bg-primary-700 text-neutral-50 font-semibold rounded-lg transition duration-300"
          >
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-neutral-400">
          Already own an account?
          <Link to="/register" className="text-primary-500 underline mx-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
