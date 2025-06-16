import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

export default function PSVCalculator() {
  const [despegue, setDespegue] = useState("");
  const [ubicacion, setUbicacion] = useState("base");
  const [tipoJornada, setTipoJornada] = useState("ordinaria");
  const [descansoHoras, setDescansoHoras] = useState(0);
  const [descansoMinutos, setDescansoMinutos] = useState(0);
  const [resultado, setResultado] = useState("");

  const calcular = () => {
    if (!despegue) {
      setResultado("✗ Por favor, introduce una hora de despegue.");
      return;
    }

    let inicioServicio = new Date(`1970-01-01T${despegue}:00`);
    if (ubicacion === "base") {
      inicioServicio.setMinutes(inicioServicio.getMinutes() - 95);
    } else {
      inicioServicio.setMinutes(inicioServicio.getMinutes() - 85);
    }

    let maxHorasServicio = tipoJornada === "ordinaria" ? 12 : 14;
    let finServicio = new Date(inicioServicio.getTime() + maxHorasServicio * 60 * 60 * 1000);
    finServicio.setMinutes(finServicio.getMinutes() - 30);

    if (tipoJornada === "especial") {
      finServicio.setHours(finServicio.getHours() + descansoHoras);
      finServicio.setMinutes(finServicio.getMinutes() + descansoMinutos);

      const diferenciaHoras = (finServicio.getTime() - inicioServicio.getTime()) / (1000 * 60 * 60);
      if (diferenciaHoras > 20) {
        finServicio = new Date(inicioServicio.getTime() + 20 * 60 * 60 * 1000);
      }
    }

    setResultado(`⏱ Hora máxima de aterrizaje: ${finServicio.toTimeString().slice(0, 5)}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Link to="/" className="text-white inline-block">
          <ArrowLeftCircle size={32} />
        </Link>

        <h2 className="text-3xl font-bold text-center">Calculadora de PSV</h2>
        <p className="text-center text-sm text-gray-300">
          Calcula la hora máxima de aterrizaje según tu jornada y ubicación.
        </p>

        <div>
          <label className="block text-sm mb-1">Hora de despegue:</label>
          <input
            type="time"
            value={despegue}
            onChange={(e) => setDespegue(e.target.value)}
            className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Ubicación de inicio:</label>
          <select
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
          >
            <option value="base">Base (1h 35m antes)</option>
            <option value="Posta">Posta (1h 25m antes)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Tipo de jornada:</label>
          <select
            value={tipoJornada}
            onChange={(e) => setTipoJornada(e.target.value)}
            className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
          >
            <option value="ordinaria">Ordinaria (Máx. 12h)</option>
            <option value="especial">Especial (Máx. 14h + Descanso)</option>
          </select>
        </div>

        {tipoJornada === "especial" && (
          <>
            <div>
              <label className="block text-sm mb-1">Descanso a bordo (Horas):</label>
              <input
                type="number"
                value={descansoHoras}
                onChange={(e) => setDescansoHoras(parseInt(e.target.value) || 0)}
                className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Descanso a bordo (Minutos):</label>
              <input
                type="number"
                value={descansoMinutos}
                onChange={(e) => setDescansoMinutos(parseInt(e.target.value) || 0)}
                className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
              />
            </div>
          </>
        )}

        <button
          onClick={calcular}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-xl transition"
        >
          Calcular
        </button>

        {resultado && (
          <div className="mt-4 text-center text-lg font-semibold text-green-400">
            {resultado}
          </div>
        )}
      </div>
    </div>
  );
}
