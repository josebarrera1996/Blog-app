// Componente de tipo funcional
// Representará la estructura de un 'Post' en específico.

import Edit from '../images/edit.png'; // Importando la imagen del edit
import Delete from '../images/delete.png'; // Importando la imagen del delete
import { Link, useNavigate, useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import DOMPurify from "dompurify";

const Single = () => {

  // Utilizando 'useState' para manejar el 'post'
  const [post, setPost] = useState({});

  // Utilizando 'useParams' para obtener el parámetro 'id' del path
  const { id } = useParams();

  // Utilizando 'useNavigation' para navegar a otras secciones
  const navigate = useNavigate();

  // Obteniendo la información del usuario conectado
  // Para verificar si este es el dueño del post mostrado
  const { currentUser } = useContext(AuthContext);

  // Utilizando 'useEffect' para traer los datos del post de la B.D
  useEffect(() => {

    const fetchData = async () => {

      try {
        const res = await axios.get(`/posts/${id}`);
        console.log(res.data);
        setPost(res.data); // Actualizando el estado con lo obtenido en 'res'
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(); // Invocando la función
  }, [id]);

  // Método para eliminar un post en específico
  const handleDelete = async () => {

    try {
      await axios.delete(`/posts/${id}`);;
      navigate("/"); // Luego de la elininación, ir hacia el home
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {

    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  return (

    <div className="single">
      <div className="content">
        <img src={`../images/${post?.img}`} alt="" />
        <div className="user">
          {/* Si el usuario tiene una imágen, mostrarla */}
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post.username}</span> <br />
            <span>Posted {moment(post.date).fromNow()}</span>
          </div>
          {/* Si el usuario actual es el dueño del post, mostrar sección para editar o eliminar al post */}
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
      </div>
      <Menu category={post.category} />
    </div>
  )
}

export default Single

