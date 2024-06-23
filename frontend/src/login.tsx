import { Button } from "./components/ui/button"; // Assuming Button component exists
import {  useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useAuth } from "./components/store";
import { useState } from "react";

const Login = () => {
  const { setId, setName, email, setEmail, password, setPassword } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const res = await response.json();
      if (res._id) {
        // Check for the user ID
        setId(res.id); // Assuming `_id` is the identifier field
        setName(res.name);
        console.log("Response from server:", res);
        setErrMsg("");
        navigate("/home");
      } else {
        setErrMsg("");
        await new Promise((resolve) => setTimeout(resolve, 200));
        setErrMsg("Verify your login info");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="login-container flex h-[80vh] w-full items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="login-form w-[40vw] rounded-xl shadow-md p-8 bg-white">
        <h2 className="text-2xl font-medium text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              onChange={handleEmail}
              type="email"
              id="email"
              name="email"
              className="mb-6 focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="your_email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              onChange={handlePassword}
              type="password"
              id="password"
              name="password"
              className="mb-6 focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-red-500 m-2">{errMsg}</p>
          </div>
          <div className="mb-6">
            <Button
              type="submit"
              className="inline-block w-full rounded my-2 bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Log in
            </Button>
            <Button
            onClick={()=> navigate("/signup")}
              type="button"
              className="inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Sign Up
            </Button>
          </div>
        </form>


        {/* Social login buttons */}
        <div className="flex items-center justify-center">
          {/* Add social login button components here */}
        </div>
      </div>
    </div>
  );
};

export default Login;
