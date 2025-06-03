import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchData from "../utils/fetchData";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetchData("/public/login", "POST", {
        username: username,
        password: password
      });

      if (response.success) {
        localStorage.setItem("token", response.message);
        navigate("/");
      } else {
        alert("Error al iniciar sesión: " + response.message);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="m-20 flex items-center justify-center bg-[#16161a]">
      <div className="max-w-md w-full bg-[#16161a] border border-[#7f5af0] rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[#fffffe] mb-6">
          Log in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#94a1b2] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-[#7f5af0] rounded-lg bg-[#16161a] text-[#fffffe] placeholder-[#72757e] focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
              autoComplete="username"
              placeholder="Type your username"
            />
          </div>
          <div>
            <label className="block text-[#94a1b2] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#7f5af0] rounded-lg bg-[#16161a] text-[#fffffe] placeholder-[#72757e] focus:outline-none focus:ring-2 focus:ring-[#7f5af0]"
              autoComplete="current-password"
              placeholder="Type your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#7f5af0] hover:bg-[#5a3bc4] text-[#fffffe] font-semibold rounded-lg transition duration-300"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
