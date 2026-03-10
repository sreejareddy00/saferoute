import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      alert("Login successful");
      navigate("/home");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-80 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center">SafeRoute Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-500 p-2 rounded-lg hover:bg-indigo-600"
        >
          Login
        </button>

        <p className="text-sm text-center">
          New user? <a href="/signup" className="text-indigo-300">Signup</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
