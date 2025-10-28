import { useEffect, useState } from "react";
import axios from "axios";
import RegistroEmpleado from "../componentes/RegistroEmpleado";


export default function AdminPanel({ usuario }) {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    stock: "",
    precio: ""
  });

  const cargarProductos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };
const cerrarSesion = () => {
  localStorage.removeItem("usuario");
  window.location.reload(); // o redirigir manualmente al login si tienes rutas
};

  useEffect(() => {
    cargarProductos();
  }, []);

  const crearProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.stock || !nuevoProducto.precio) return;
    try {
      await axios.post("http://localhost:3001/productos", nuevoProducto);
      setNuevoProducto({ nombre: "", stock: "", precio: "" });
      cargarProductos();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  const editarProducto = async (id) => {
    const nombre = prompt("Nuevo nombre:");
    const stock = prompt("Nuevo stock:");
    const precio = prompt("Nuevo precio:");
    if (!nombre || !stock || !precio) return;

    try {
      await axios.put(`http://localhost:3001/productos/${id}`, { nombre, stock, precio });
      cargarProductos();
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
      await axios.delete(`http://localhost:3001/productos/${id}`);
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <p>Bienvenido, {usuario.nombre}</p>
      <button onClick={cerrarSesion}>Cerrar sesión</button>


      {/* Formulario para crear producto */}
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />
        <button onClick={crearProducto}>Agregar</button>
      </div>

      {/* Sección para registrar empleados */}
      <RegistroEmpleado />
      
      {/* Lista de productos */}
      <ul>
        {productos.map(p => (
          <li key={p.id}>
            {p.nombre} - Stock: {p.stock} - Precio: ${p.precio}
            <button onClick={() => editarProducto(p.id)}>Editar</button>
            <button onClick={() => eliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
    
  );

}
