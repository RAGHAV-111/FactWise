import LandingPage from "./Components/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeopleList from "./Components/PeopleList";
import abcqwe from "./Components/abcqwe";
import XYZ from "./Components/XYZ";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleList/>} />

      </Routes>
    </Router>
  );
}
