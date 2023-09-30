import '../../public/css/style.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa'; // Importa los iconos de Font Awesome


function App() {
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api'); // Asegúrate de que esta URL coincida con la ruta definida en el servidor Express.
      setItems(response.data);
    } catch (error) {
      console.error('Error al obtener elementos:', error);
    }
  };
  // Edit
  const handleEdit = (id) => {
    const itemToEdit = items.find((item) => item._id === id);
    setEditItem(itemToEdit);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/update/${editItem._id}`, editItem);
      if (response.status === 200) {
        // La actualización fue exitosa, puedes realizar alguna acción como recargar la lista de elementos.
        fetchItems();
        setEditItem(null); // Limpia el estado de edición
      }
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
    }
  };



  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`); // Cambia la URL según tu ruta de eliminación
      fetchItems(); // Vuelve a cargar la lista de elementos después de eliminar uno
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2>Lista de Elementos</h2>
      <div className="bg-white shadow-md rounded-md p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Password
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.password}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(item._id)}><FaEdit /></button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleDelete(item._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editItem && (
        <form onSubmit={handleUpdate} className="bg-dark p-4 border rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={editItem.username}
              onChange={(e) => setEditItem({ ...editItem, username: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editItem.name}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={editItem.password}
              onChange={(e) => setEditItem({ ...editItem, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              Guardar Cambios
            </button>
          </div>
        </form>

      )}
    </div>
  );
}

export default App;
