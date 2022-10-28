// Componente de tipo funcional
// Representará el 'Footer' de la aplicación.

import Logo from '../images/logo.png'; // Importamos el logo

const Footer = () => {

  return (

    <footer>
      <img src={Logo} alt="Logo" />
      <span>
        Made with <b>Node.js</b> and <b>React.js</b>.
      </span>
    </footer>
  )
}

export default Footer;