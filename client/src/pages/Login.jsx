import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext"; // Importando el contexto para la autentificación

// Componente de tipo funcional que representará la sección de 'Login'

const Login = () => {

  // Para manejar la navegación
  const navigate = useNavigate();

  /* Utilizando 'useState' */

  // Para manejar los estados relacionados con los campos en los inputs
  const [inputs, setInputs] = useState({

    // Variables que serán relacionadas con los campos de la tabla 'users'
    username: '',
    password: ''
  });

  // Para manejar el contexto del login
  const { currentUser, login } = useContext(AuthContext); // Accediendo a 'currentUser' y 'login' de 'AuthContext'

  // Para manejar los errores
  const [err, setError] = useState(null);

  // Función para manejar lo ingresado en los inputs
  const handleChange = (e) => {

    // Actualizando los estados con lo ingresado en los inputs
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value })); // Manejando múltiples inputs
  }

  // Función para logearnos al enviar el formulario
  const handleSubmit = async (e) => {

    e.preventDefault(); // Para evitar que la página se recargue al enviar el formulario

    try {
      await login(inputs); // Invocando la función para poder logearnos
      navigate("/"); // Navegar hacia la 'home' luego del login exitoso.

    } catch (err) {
      setError(err.response.data); // Actualizando el estado del error con el mensaje definido en el seridor
    }
  };

  return (

    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input required type="text" name="username" placeholder='username' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Login</button>
        {/* Si hay error, mostrarlo */}
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login;