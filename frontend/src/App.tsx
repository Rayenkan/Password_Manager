import "./App.css";
import Nav from "./nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import HomePage from "./HomePage";
import Pages from "./components/pages";
function App() {
  return (
    <div className=" flex   ">
      <Nav />
      <div className="flex flex-col w-full">
        <HomePage/>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Login} />
            <Route path="/home" Component={Pages} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
