import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchData from "../utils/fetchData";
import { useNotification } from "../context/NotificationContext";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { notify } = useNotification();
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.username || !form.password) {
      notify("Every field is needed", "info");
      return;
    }

    try {
      const response = await fetchData("/public/register", "POST", {
        email: form.email,
        username: form.username,
        password: form.password,
      });

      if (response.success) {
        notify("Registered successfully", "success");
        setForm({ email: "", username: "", password: "" });
        setTimeout(() => navigate("/login"), 1000); 
      } else {
        notify(response.message || "Something went wrong with the sign up", "error");
      }
    } catch (error: any) {
      notify(error.message || "Something went wrong with the sign up", "error");
    }
  };

  return (
    <div className="p-20 flex items-center justify-center bg-neutral-900">
      <div className="max-w-md w-full bg-neutral-900 border border-primary-500 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-neutral-50 mb-6">
          Sign up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-neutral-400 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-primary-500 rounded-lg bg-neutral-900 text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Type your email"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-neutral-400 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-primary-500 rounded-lg bg-neutral-900 text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Type your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-neutral-400 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-primary-500 rounded-lg bg-neutral-900 text-neutral-50 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Type your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-primary-500 hover:bg-primary-700 text-neutral-50 font-semibold rounded-lg transition duration-300"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-neutral-400">
          Already own an account?
          <Link to="/login" className="text-primary-500 underline mx-2">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
