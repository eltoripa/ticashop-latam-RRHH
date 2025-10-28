import Asistencia from "../componentes/Asistencia";
import Vacaciones from "../componentes/Vacaciones";
import Liquidaciones from "../componentes/Liquidaciones";

export default function PanelRRHH({ usuario }) {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Módulo de Recursos Humanos</h1>
      <p>Sesión activa: {usuario.nombre} ({usuario.rol})</p>

      <section>
        <h2>1️⃣ Registro de Asistencia</h2>
        <Asistencia empleado={usuario.nombre} rol={usuario.rol} />
      </section>

      <hr />

      <section>
        <h2>2️⃣ Solicitud de Vacaciones</h2>
        <Vacaciones usuario={usuario} /> {/* 👈 agregado */}
      </section>

      <hr />

      <section>
        <h2>3️⃣ Liquidaciones de Sueldo</h2>
        <Liquidaciones usuario={usuario} /> {/* 👈 agregado */}
      </section>
    </div>
  );
}

