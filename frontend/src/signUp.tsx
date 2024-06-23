import { Button } from "./components/ui/button"; // Assuming Button component exists
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useAuth } from "./components/store";
import { useState } from "react";

const SignUp = () => {
  const { setId, setName, setEmail, setPassword } = useAuth(); // Destructure authentication functions from custom hook
  const navigate = useNavigate(); // Initialize useNavigate hook from react-router-dom
  const [email, setEmailState] = useState(""); // State for email input
  const [password, setPasswordState] = useState(""); // State for password input
  const [name, setNameState] = useState(""); // State for name input
  const [errMsg, setErrMsg] = useState(""); // State for error messages

  // Event handler for updating name state
  const handleUserName = (event) => {
    setNameState(event.target.value);
  };

  // Event handler for updating email state
  const handleEmail = (event) => {
    setEmailState(event.target.value);
  };

  // Event handler for updating password state
  const handlePassword = (event) => {
    setPasswordState(event.target.value);
  };

  // Submit handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      // Send POST request to addUser endpoint
      const response = await fetch("http://localhost:3000/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set request headers
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse error response
        throw new Error(errorResponse.message || "Network response was not ok"); // Throw error if response is not ok
      }

      const res = await response.json(); // Parse successful response
      if (res._id) { // Check if user ID is returned
        setId(res._id); // Set user ID using setId function
        setName(res.name); // Set user name using setName function
        setEmail(res.email); // Set email using setEmail function
        setPassword(res.password); // Set password using setPassword function
        console.log("Response from server:", res); // Log server response
        setErrMsg(""); // Clear error message
        navigate("/"); // Navigate to home page
      } else {
        setErrMsg("Sign-up failed"); // Set error message for failed sign-up
      }
    } catch (error) {
      console.error("Fetch error:", error); // Log fetch error
      setErrMsg(error.message); // Set error message in case of error
    }
  };

  return (
    <div className="signup-container flex h-[80vh] w-full items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="signup-form w-[40vw] max-h-full rounded-xl shadow-md p-8 bg-white">
        <h2 className="text-2xl font-medium text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* User name input field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              onChange={handleUserName}
              type="text"
              id="name"
              name="name"
              className="mb-6 focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="Enter your name"
            />
          </div>

          {/* Email input field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
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

          {/* Password input field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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

          {/* Remember me checkbox */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember-me" className="mr-2" />
            <label htmlFor="remember-me" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Error message display */}
          <div className="flex justify-center items-center">
            <p className="text-red-500 m-2">{errMsg}</p>
          </div>

          {/* Sign up and login buttons */}
          <div className="mb-6 flex flex-row">
            <Button
              type="submit"
              className="inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/")} // Navigate to login page on click
              type="button"
              className="inline-block mx-2 w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Login
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

export default SignUp;
