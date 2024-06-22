import { Button } from "./components/ui/button"; // Assuming Button component exists
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const Login = () => {
  const navigate = useNavigate(); // Use the hook to get navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    navigate("/home"); // Use navigate to go to the home page
  };

  return (
    <section className="login-container flex h-full w-full items-center justify-center bg-gradient-to-r from-gray-800 to-gray-700">
      <div className="login-form max-w-xl rounded-xl shadow-md p-8 bg-white">
        <h2 className="text-2xl font-medium text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}> {/* Add form tag with onSubmit handler */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mb-6 focus:outline-none focus:border-blue-500 border border-gray-300 rounded-md px-4 py-2 w-full"
              placeholder="your_email@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
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

          <div className="mb-6">
            <Button
              type="submit" // Change to submit for form submission
              className="inline-block w-full rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              Log in
            </Button>
          </div>
        </form> {/* Close form tag */}

        {/* Forgot password link */}
        <a href="#" className="block text-center text-sm text-gray-600 mb-4">
          Forgot password?
        </a>

        {/* Social login buttons */}
        <div className="flex items-center justify-center">
          {/* Add social login button components here */}
        </div>
      </div>
    </section>
  );
};

export default Login;
