import { useState } from "react";
import axios from "axios";

export default function Comisiones() {
  const [vendedor, setVendedor] = useState("");
  const [ventas, setVentas] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [mensaje, setMensaje] = useState("");

  const calcularComision = async () => {
    try {
      const total = (parseFloat(ventas) * parseFloat(porcentaje)) / 100;
      await axios.post("http://localhost:3001/comisiones", {
        vendedor,
        ventas_mes: ventas,
        porcentaje,
        total,
      });
      setMensaje(`Comisión registrada para ${vendedor}: $${total}`);
      setVendedor("");
      setVentas("");
      setPorcentaje("");
    } catch (error) {
      console.error(error);
      setMensaje("Error al registrar comisión");
    }
  };

  return (
    <div style={{ padding: "15px", border: "1px solid #ccc", margin: "10px" }}>
      <h3>Registro de Comisiones</h3>
      <input
        placeholder="Vendedor"
        value={vendedor}
        onChange={(e) => setVendedor(e.target.value)}
      />
      <input
        placeholder="Ventas del mes"
        type="number"
        value={ventas}
        onChange={(e) => setVentas(e.target.value)}
      />
      <input
        placeholder="% Comisión"
        type="number"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
      />
      <button onClick={calcularComision}>Calcular y guardar</button>
      <p>{mensaje}</p>
    </div>
  );
}
