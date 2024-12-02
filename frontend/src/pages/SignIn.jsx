import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from "../components/AuthProvider";

export default function SignIn() {
  const { checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/get-csrf/")
      .then((response) => {
        console.log("CSRF token set:", response.data);
      })
      .catch((error) => console.error("Error setting CSRF token:", error));
  }, []);

  useEffect(() => {
    // Check authentication status on mount
    console.log("Check Auth Status!!! :");
    checkAuthStatus()
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          console.log("User is already authenticated, redirecting...");
          navigate("/balance");
        }
      })
      .catch((error) => {
        console.error("Error during auth status check:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array to only run on mount

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/login/", { username, password });
      console.log("Login successful:", response.data);
      navigate("/balance/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Unable to connect to the server";
      setError(errorMessage);
      console.error("Error logging in:", errorMessage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-stone-300 flex justify-center items-center h-[100vh]">
      <div className="px-6 md:px-12 space-y-8 bg-gray-700 py-16 w-11/12 mx-auto rounded-xl max-w-xl">
        <h1 className="text-4xl">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-500 border border-gray-400 text-stone-100 rounded-lg block w-full p-2.5"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-500 border border-gray-400 text-stone-100 rounded-lg block w-full p-2.5"
              placeholder="•••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-6 py-2"
          >
            Sign In!
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
