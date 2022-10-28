import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// Componente de tipo funcional que representará la sección de 'Register'

const Register = () => {

  // Para manejar la navegación
  const navigate = useNavigate();

  /* Utilizando 'useState' */

  // Para manejar los estados relacionados con los campos en los inputs
  const [inputs, setInputs] = useState({

    // Variables que serán relacionadas con los campos de la tabla 'users'
    username: '',
    email: '',
    password: ''
  });

  // Para manejar los errores
  const [err, setError] = useState(null);

  // Función para manejar lo ingresado en los inputs
  const handleChange = (e) => {

    // Actualizando los estados con lo ingresado en los inputs
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value })); // Manejando múltiples inputs
  }

  // Función para insertar el nuevo usuario al enviar el formulario
  const handleSubmit = async (e) => {

    e.preventDefault(); // Para evitar que la página se recargue al enviar el formulario

    try {

      // Utilizando 'axios' para conectarnos con el server e insertar en la B.D el nuevo usuario
      await axios.post("/auth/register", inputs); // Utilizando el 'endpoint' para la inserción
      // const res = await axios.post("/auth/register", inputs);
      // console.log(res); // Ver el mensaje al obtener una inserción correcta
      navigate("/login"); // Luego de la inserción, navegar hacia el 'login'

    } catch (err) {
      setError(err.response.data); // Actualizando el estado del error con el mensaje definido en el seridor
    }
  };

  // console.log(inputs);

  return (

    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input required type="text" name="username" placeholder='username' onChange={handleChange} />
        <input required type="email" name="email" placeholder='email' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {/* En caso de error mostrarlo en pantalla */}
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register;