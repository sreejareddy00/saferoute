import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/users/signup", { name, email, password });
      alert("Account created");
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-80 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-center">Create SafeRoute Account</h2>

        <input placeholder="Name" className="w-full p-2 rounded bg-white/20" value={name} onChange={(e)=>setName(e.target.value)} />
        <input placeholder="Email" className="w-full p-2 rounded bg-white/20" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-2 rounded bg-white/20" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <button onClick={handleSignup} className="w-full bg-indigo-500 p-2 rounded-lg hover:bg-indigo-600">
          Signup
        </button>

        <p className="text-sm text-center">
          Already have account? <a href="/" className="text-indigo-300">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
