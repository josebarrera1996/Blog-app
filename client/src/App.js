import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from 'react-router-dom';

// Páginas
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import Single from './pages/Single';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Estilos
import "./styles.scss"; // Importando los estilos de la app.

// Función para renderizar componentes en las secciones que deseemos
// Ideal para componentes como los de 'Footer', 'Navbar' que pueden estar presentes en varias páginas, pero no en todas.

const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet /> {/* Outlet representará los componentes hijos a renderizar */}
      <Footer />
    </>
  )
}

// Creando las rutas de la aplicación

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/post/:id',
        element: <Single />
      },
      {
        path: '/write',
        element: <Write />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {
  
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
