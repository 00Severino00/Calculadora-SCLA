import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

export default function PSVCalculator() {
  /* ═════════════ Entradas ═════════════ */
  const [briefing, setBriefing] = useState("");
  const [tipoJornada, setTipoJornada] = useState("ordinaria");

  // Extensión a 14 h para jornada ordinaria
  const [extendOrdinaria, setExtendOrdinaria] = useState(false);

  const [reposoHoras, setReposoHoras] = useState(0);
  const [reposoMin, setReposoMin] = useState(0);

  const [tvHoras, setTvHoras] = useState(0);
  const [tvMin, setTvMin] = useState(0);

  const [postaHoras, setPostaHoras] = useState(0);
  const [postaMin, setPostaMin] = useState(0);

  const [resultado, setResultado] = useState("");

  /* ═════════════ Lógica principal ═════════════ */
  const calcular = () => {
    if (!briefing) {
      setResultado("✗ Falta la hora de briefing.");
      return;
    }

    /* 1) Inicio del briefing */
    const inicio = new Date(`1970-01-01T${briefing}:00`);

    /* 2) PSV máximo */
    let psvMaxHoras;
    if (tipoJornada === "ordinaria") {
      psvMaxHoras = extendOrdinaria ? 14 : 12;
    } else {
      psvMaxHoras = 14 + reposoHoras + reposoMin / 60;
    }

    /* 2‑bis) Tope reglamentario absoluto de 20 h */
    if (psvMaxHoras > 20) psvMaxHoras = 20;

    /* 3) Fin del periodo de servicio */
    const limiteServicio = new Date(
      inicio.getTime() + psvMaxHoras * 60 * 60 * 1000
    );

    /* 4) Hora límite de aterrizaje (– 30 min post‑vuelo) */
    const limiteAterrizaje = new Date(
      limiteServicio.getTime() - 30 * 60 * 1000
    );

    /* 5) Duración TV + tiempo en posta */
    const duracionMin =
      tvHoras * 60 +
      tvMin +
      postaHoras * 60 +
      postaMin;

    /* 6) Hora máxima de salida */
    const salidaMax = new Date(
      limiteAterrizaje.getTime() - duracionMin * 60 * 1000
    );

    /* 7) Resultado */
    const fmt = (d: Date): string => d.toTimeString().slice(0, 5);

    const noTiempoVuelo = tvHoras === 0 && tvMin === 0; // ⇢ NUEVO

    setResultado(
      noTiempoVuelo
        ? `🛬 Hora límite de aterrizaje: ${fmt(limiteAterrizaje)}`
        : `🛬 Hora límite de aterrizaje: ${fmt(limiteAterrizaje)}\n` +
          `🛫 Hora máxima de salida   : ${fmt(salidaMax)}`
    );
  };

  /* ═════════════ UI ═════════════ */
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Link to="/" className="text-white inline-block">
          <ArrowLeftCircle size={32} />
        </Link>

        <h2 className="text-3xl font-bold text-center">Calculadora de PSV</h2>

        {/* Briefing */}
        <div>
          <label className="block text-sm mb-1">Hora de briefing:</label>
          <input
            type="time"
            value={briefing}
            onChange={(e) => setBriefing(e.target.value)}
            className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
          />
        </div>

        {/* Tipo de jornada */}
        <div>
          <label className="block text-sm mb-1">Tipo de jornada:</label>
          <select
            value={tipoJornada}
            onChange={(e) => {
              setTipoJornada(e.target.value);
              if (e.target.value === "ordinaria") {
                setReposoHoras(0);
                setReposoMin(0);
              }
            }}
            className="w-full p-2 rounded bg-[#111827] text-white border border-gray-600"
          >
            <option value="ordinaria">Ordinaria (12 h)</option>
            <option value="especial">Especial (14 h + reposo a bordo)</option>
          </select>
        </div>

        {/* Extensión 14 h para ordinaria */}
        {tipoJornada === "ordinaria" && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="extOrdinaria"
              checked={extendOrdinaria}
              onChange={(e) => setExtendOrdinaria(e.target.checked)}
              className="h-4 w-4 text-blue-600"
            />
            <label htmlFor="extOrdinaria" className="text-sm">
              Contingencia meteo / emergencia médica / mantenimiento calificado
              (extiende a 14 h)
            </label>
          </div>
        )}

        {/* Reposo a bordo (solo si especial) */}
        {tipoJornada === "especial" && (
          <div className="pt-4">
            <label className="block text-sm mb-1">
              Reposo a bordo (HH:MM):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Horas"
                value={reposoHoras}
                onChange={(e) =>
                  setReposoHoras(parseInt(e.target.value) || 0)
                }
                className="p-2 rounded bg-[#111827] text-white border border-gray-600"
              />
              <input
                type="number"
                placeholder="Minutos"
                value={reposoMin}
                onChange={(e) =>
                  setReposoMin(parseInt(e.target.value) || 0)
                }
                className="p-2 rounded bg-[#111827] text-white border border-gray-600"
              />
            </div>
          </div>
        )}

        {/* Tiempo de vuelo */}
        <div className="pt-4">
          <label className="block text-sm mb-1">Tiempo de vuelo (HH:MM):</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Horas"
              value={tvHoras}
              onChange={(e) => setTvHoras(parseInt(e.target.value) || 0)}
              className="p-2 rounded bg-[#111827] text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Minutos"
              value={tvMin}
              onChange={(e) => setTvMin(parseInt(e.target.value) || 0)}
              className="p-2 rounded bg-[#111827] text-white border border-gray-600"
            />
          </div>
        </div>

        {/* Tiempo en posta */}
        <div>
          <label className="block text-sm mb-1">Tiempo en posta (HH:MM):</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Horas"
              value={postaHoras}
              onChange={(e) => setPostaHoras(parseInt(e.target.value) || 0)}
              className="p-2 rounded bg-[#111827] text-white border border-gray-600"
            />
            <input
              type="number"
              placeholder="Minutos"
              value={postaMin}
              onChange={(e) => setPostaMin(parseInt(e.target.value) || 0)}
              className="p-2 rounded bg-[#111827] text-white border border-gray-600"
            />
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={calcular}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-xl transition"
        >
          Calcular
        </button>

        {/* Resultado */}
       {resultado && (
       <div className="
+            mt-4
+            w-full
+            text-left
+            text-lg
+            font-semibold
+            text-green-400
+            whitespace-pre-wrap
+            break-words
+          ">
+            {resultado}
+          </div>
)}

      </div>
    </div>
  );
}
