import { useState } from "react";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function TurnoCalculator() {
  const [inicioTurno, setInicioTurno] = useState("");
  const [finTurno, setFinTurno] = useState("");
  const [cantidadTurnos, setCantidadTurnos] = useState(1);
  const [tiempoEntreTurnos, setTiempoEntreTurnos] = useState(0);
  const [resultado, setResultado] = useState("");

  const calcularTurnos = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inicioTurno || !finTurno || cantidadTurnos < 1) {
      setResultado("Por favor, completa todos los campos requeridos.");
      return;
    }

    let inicio = new Date(`1970-01-01T${inicioTurno}:00`);
    let fin = new Date(`1970-01-01T${finTurno}:00`);

    // Ajustar si el fin es menor que el inicio (pasa al día siguiente)
    if (fin <= inicio) {
      fin.setDate(fin.getDate() + 1);
    }

    const duracionTotal = (fin.getTime() - inicio.getTime()) / (1000 * 60); // en minutos
    const duracionTurno = (duracionTotal - tiempoEntreTurnos * (cantidadTurnos - 1)) / cantidadTurnos;

    if (duracionTurno <= 0) {
      setResultado("No hay suficiente tiempo para los turnos dados.");
      return;
    }

    let resultados = [];
    let inicioActual = new Date(inicio);

    for (let i = 0; i < cantidadTurnos; i++) {
      let finActual = new Date(inicioActual.getTime() + duracionTurno * 60000);
      const horas = Math.floor(duracionTurno / 60);
      const minutos = Math.round(duracionTurno % 60);
      resultados.push(
        `Turno ${i + 1}: ${inicioActual.toTimeString().slice(0, 5)} - ${finActual.toTimeString().slice(0, 5)} (${horas}h ${minutos}m)`
      );
      inicioActual = new Date(finActual.getTime() + tiempoEntreTurnos * 60000);
    }

    setResultado(`<h3 class="text-lg mb-2">Resultados:</h3><ul class="list-disc pl-4">${resultados.map(r => `<li>${r}</li>`).join("")}</ul>`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center px-6">
      <form onSubmit={calcularTurnos} className="bg-[#0b0f1a] max-w-md w-full space-y-4">
        <Link to="/" className="text-white mb-4 inline-block">
  <ArrowLeftCircle size={32} />
</Link>

        <h2 className="text-3xl font-bold text-center">Turnos de descanso</h2>

        <div>
          <label className="block text-sm mb-1">Inicio del turno:</label>
          <input type="time" value={inicioTurno} onChange={e => setInicioTurno(e.target.value)} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Fin del turno:</label>
          <input type="time" value={finTurno} onChange={e => setFinTurno(e.target.value)} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Cantidad de turnos:</label>
          <input type="number" value={cantidadTurnos} onChange={e => setCantidadTurnos(parseInt(e.target.value))} min={1} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Tiempo entre turnos (opcional, minutos):</label>
          <input type="number" value={tiempoEntreTurnos} onChange={e => setTiempoEntreTurnos(parseInt(e.target.value) || 0)} className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 transition">Calcular</button>

        {resultado && (
          <div className="mt-4 text-sm" dangerouslySetInnerHTML={{ __html: resultado }} />
        )}
      </form>
    </div>
  );
}