import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? `${BASE_URL}/api/auth/signup` : `${BASE_URL}/api/auth/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/"); // ✅ Redirect to Home after Login/Signup
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>
        <p className="text-center mt-5 text-gray-700">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
