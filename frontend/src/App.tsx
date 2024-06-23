import "./App.css";
import Nav from "./nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import HomePage from "./HomePage";
import Pages from "./components/pages";
import SignUp from "./signUp";
function App() {
  return (
    <div className=" flex overflow-hidden max-h-[100vh] ">
      <Nav />
      <div className="flex flex-col w-full h-full ">
        <HomePage/>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/home" Component={Pages} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
