// src/components/Tareas.js

import React, { useEffect, useState } from 'react';
import TareaService from '../services/TareaService';

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [token, setToken] = useState(''); // Suponemos que el token ya fue obtenido e incluido

  // Cargar todas las tareas al montar el componente
  useEffect(() => {
    const cargarTareas = async () => {
      const data = await TareaService.obtenerTareas();
      setTareas(data);
    };
    cargarTareas();
  }, []);

  // Manejar el envío de una nueva tarea
  const manejarEnvioTarea = async (e) => {
    e.preventDefault();
    const nuevaTarea = { titulo, descripcion, completada: false };
    const tareaCreada = await TareaService.crearTarea(nuevaTarea, token);
    setTareas([...tareas, tareaCreada]);
    setTitulo('');
    setDescripcion('');
  };

  // Manejar la eliminación de una tarea
  const manejarEliminacionTarea = async (id) => {
    await TareaService.eliminarTarea(id, token);
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  return (
    <div>
      <h2>Gestor de Tareas</h2>
      <form onSubmit={manejarEnvioTarea}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Agregar Tarea</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <h3>{tarea.titulo}</h3>
            <p>{tarea.descripcion}</p>
            <button onClick={() => manejarEliminacionTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tareas;

