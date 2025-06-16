import { Link } from "react-router-dom";
import { PlaneTakeoff, Clock, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Calculadoras de Tripulación</h1>
      <p className="text-center text-gray-400 mb-10">Selecciona la herramienta que necesites.</p>

      <div className="flex flex-col items-center space-y-10">
        <Link to="/ley7horas" className="flex flex-col items-center hover:scale-110 transition">
          <PlaneTakeoff size={80} className="text-indigo-400" />
          <span className="mt-2 text-indigo-400 font-medium">Ley 7 horas</span>
        </Link>

        <Link to="/turnos" className="flex flex-col items-center hover:scale-110 transition">
          <Clock size={80} className="text-indigo-400" />
          <span className="mt-2 text-indigo-400 font-medium">Turnos</span>
        </Link>

        <Link to="/psv" className="flex flex-col items-center hover:scale-110 transition">
          <Calculator size={80} className="text-indigo-400" />
          <span className="mt-2 text-indigo-400 font-medium">PSV</span>
        </Link>
      </div>
    </div>
  );
}
