import { useState } from "react";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Ley7Horas() {
  const [inicio1, setInicio1] = useState("");
  const [fin1, setFin1] = useState("");
  const [inicio2, setInicio2] = useState("");
  const [fin2, setFin2] = useState("");
  const [resultado, setResultado] = useState("");

  const evaluarCompatibilidad = (e: React.FormEvent) => {
    e.preventDefault();

    const i1 = new Date(inicio1);
    const f1 = new Date(fin1);
    const i2 = new Date(inicio2);
    const f2 = new Date(fin2);

    const msHora = 1000 * 60 * 60;

    // Ajuste por si cruza medianoche
    if (f1 < i1) f1.setDate(f1.getDate() + 1);
    if (f2 < i2) f2.setDate(f2.getDate() + 1);
    if (i2 < i1) i2.setDate(i2.getDate() + 1);

    const duracion1 = (f1.getTime() - i1.getTime()) / msHora;
    const duracion2 = (f2.getTime() - i2.getTime()) / msHora;
    const totalHoras = duracion1 + duracion2;

    const diferenciaInicio = (i2.getTime() - i1.getTime()) / msHora;
    const descansoEntreVuelos = (i2.getTime() - f1.getTime()) / msHora;

    let mensaje = "";

    if (duracion1 > 7) {
      const descansoMin = duracion1 + 3;
      if (descansoEntreVuelos >= descansoMin) {
        mensaje = `✅ Permitido: primer periodo > 7h y se respetan las ${descansoMin}h mínimas de descanso entre vuelos.`;
      } else {
        mensaje = `❌ No permitido: el descanso entre vuelos es de ${descansoEntreVuelos.toFixed(2)}h y debe ser al menos de ${descansoMin}h.`;
      }
    } else {
      if (totalHoras <= 12) {
        const maxFin2 = new Date(i2.getTime() + (12 - duracion1) * msHora);
        const horaLimite = maxFin2.toTimeString().slice(0, 5);
        mensaje = `✅ Permitido: primer periodo ≤ 7h y suma total ≤ 12h.\n🔔 Hora máxima para terminar segundo vuelo: ${horaLimite}`;
      } else {
        mensaje = "❌ No permitido: el primer periodo es ≤ 7h y la suma total supera 12h.";
      }
    }

    setResultado(mensaje);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white px-6 py-10 flex flex-col items-center">
      <Link to="/" className="absolute left-4 top-4">
        <ArrowLeftCircle size={32} className="text-white hover:text-gray-300" />
      </Link>

      <h2 className="text-3xl font-bold mb-6 text-center">Compatibilidad entre Vuelos</h2>

      <form onSubmit={evaluarCompatibilidad} className="bg-[#0b0f1a] w-full max-w-lg space-y-4">
        <div>
          <label className="block text-sm mb-1">Inicio primer vuelo:</label>
          <input type="datetime-local" value={inicio1} onChange={e => setInicio1(e.target.value)} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Fin primer vuelo:</label>
          <input type="datetime-local" value={fin1} onChange={e => setFin1(e.target.value)} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Inicio segundo vuelo:</label>
          <input type="datetime-local" value={inicio2} onChange={e => setInicio2(e.target.value)} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm mb-1">Fin segundo vuelo:</label>
          <input type="datetime-local" value={fin2} onChange={e => setFin2(e.target.value)} required className="w-full bg-transparent border border-gray-600 rounded-xl px-3 py-2" />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 transition">Evaluar</button>
      </form>

      {resultado && (
        <div className="mt-6 p-4 bg-[#1a1a1a] border-l-4 border-green-500 rounded-lg whitespace-pre-line">
          {resultado}
        </div>
      )}
    </div>
  );
}
