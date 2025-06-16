import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import PSVCalculator from "./PSVCalculator";
import TurnoCalculator from "./TurnoCalculator";
import Ley7Horas from "./Ley7Horas";
import Home from "./Home";


export default function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psv" element={<PSVCalculator />} />
        <Route path="/turnos" element={<TurnoCalculator />} />
        <Route path="/ley7horas" element={<Ley7Horas />} />
      </Routes>
    </Router>
  );
}
