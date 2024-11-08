import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tareas/'

//obtener toda la lista de tareas... get
const obtenerTareas = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// Crear una tarea nueva... POST
const crearTarea = async (tarea, token) => {
  const response = await axios.post(API_URL, tarea, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Actualizar una tarea existente... POST
// POST = crea un registro nuevo.
// PATCH o PUT = Actualiza solo una parte
// POST = se usa cuando actualizo TODO EL OBJETO.

const actualizarTarea = async (id, tarea, token) => {
  const response = await axios.put(`${API_URL}${id}/`, tarea, {
    headers: { Authorization: `Bearer ${token}` },
});
  return response.data
}

// eliminar una tarea... delete
const eliminarTarea = async (id, token) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
})
}


export default {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
}



