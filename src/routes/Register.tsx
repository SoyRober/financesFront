import { useState } from "react";
import fetchData from "../utils/fetchData";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email || !form.username || !form.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetchData("/public/register", "POST", {
        email: form.email,
        username: form.username,
        password: form.password,
      });
      
      if (response.success) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        setForm({ email: "", username: "", password: "" });
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <div className="m-30 flex items-center justify-center">
      <div className="max-w-md w-full bg-blue-900 border border-blue-500 rounded-2xl shadow-lg p-8">
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Registrarse
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-base text-blue-200 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-700 rounded-lg bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your email"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-base text-blue-200 mb-1"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-700 rounded-lg bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your username"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-base text-blue-200 mb-1"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-blue-700 rounded-lg bg-blue-800 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition duration-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
