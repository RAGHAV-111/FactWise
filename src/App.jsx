
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeopleList from "./Components/PeopleList";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleList/>} />
      </Routes>
    </Router>
  );
}
