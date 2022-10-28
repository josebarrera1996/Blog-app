import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

// Declarando nuestro proveedor de 'AuthContext'
// Servirá para trabajar con el LocalStorage en lo que respecta al logeo y deslogeo de los usuarios
// Más espefíciamente, podremos utilizar el hook 'useState' en cualquier lado de la aplicación

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        // Estado inicial -> Objeto almacenado en el LocalStorage para identificar si hay un usuario o no conectado
        JSON.parse(localStorage.getItem('user')) || null
    );

    // Método para poder logearnos
    const login = async (inputs) => {

        const res = await axios.post("/auth/login", inputs); // Realizar la conexión con el servidor
        setCurrentUser(res.data); // Actualizar el estado inicial con la info del usuario logeado
    };

    // Método para poder deslogearnos
    const logout = async (inputs) => {

        await axios.post("/auth/logout"); // Realizar la conexión con el servidor
        setCurrentUser(null); // Actualizar el estado inicial con 'null' ya que nos deslogeamos
    };

    // Utilizando 'useEffect' para actualizar el LocalStorage cada vez que cambiamos de usuario
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser)); // Actualizar el 'LocalStorage' 
    }, [currentUser]); // Reutilizar este hook cada vez que cambiemos de usuario


    return (
        
        // Retornando nuestro proveedor de contexto para que sea aplicado en los componentes deseados
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}