import { useState } from "react";
// import  fetchItems from "./Read";
function CreateElement() {
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")


 
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch("/api/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, name, password })
            });
            
            if (response.status === 201) {
                // fetchItems()
                console.log('Elemento creado con exito.');

            } else {
                console.log("Error al Crear el Elemento.");
            }

        } catch (error) {
            console.log("Error al realizar la Solicitud", error);
        }

    }


    return (
        <>
            <div className="py-12">
                <h2 className="text-2xl font-bold">Formulario</h2>
                <p className="mt-2 text-lg text-gray-600">Personaliza tu formulario con Tailwind CSS.</p>
                <div className="mt-8 max-w-md">
                    <div className="grid grid-cols-1 gap-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="mt-1 block w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="UserName"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="mt-1 block w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    Crear Elemento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>

    );
}
export default CreateElement;

