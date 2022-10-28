// Componente de tipo funcional
// Representará el menú de navegación.

import Logo from '../images/logo.png'; // Importando la imágen estática del logo
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {

  // Utilizando 'useContext' para manejar el estado del usuario actual y el de poder deslogearnos
  const { currentUser, logout } = useContext(AuthContext);

  return (

    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCIENCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {/* Si hay un usuario logeado, mostrar este apartado para deslogearnos */}
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) :
            // Si no hay un usuario logeado, mostrar este apartado para poder logearnos
            (
              <Link className="link" to="/login">
                Login
              </Link>
            )}
          <span className='write'>
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar;