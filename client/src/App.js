import "./App.css";
import Home from "./Components/Home";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import CandidatesList from "./Components/CandidatesList";
import Navigation from "./Components/Navigation";
import PositionsList from "./Components/PositionsList";
import ApplicationsList from "./Components/ApplicationsList";
import Profile from "./Components/Profile";
import Comparison from "./Components/Comparison";

function App() {
  return (
    <>
      <Routes>
        <Route  path="/" element={<Navigation/>}>
          <Route  index element={<Home/>}/>
          {/* <Route  path="positions" element={<PositionsList/>} /> */}
          <Route  path="candidates" element={<CandidatesList/>} />
          <Route  path="profile" element={<Profile/>} />
          <Route  path="comparison" element={<Comparison/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
