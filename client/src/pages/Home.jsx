// Componente de tipo funcional
// Representará la sección de 'Home'.

import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useLocation } from "react-router-dom";

const Home = () => {

  // Utilizando 'useState' para manejar los 'posts'
  const [posts, setPosts] = useState([]);

  // Utilizando 'useLocation' para el manejo de las 'categorías'
  const category = useLocation().search; // Accediendo a la prop 'search' que contiene el query buscado

  console.log(category);


  // Utilizando 'useEffect' para traer los 'posts' de la B.D
  useEffect(() => {

    const fetchData = async () => {

      try {
        const res = await axios.get(`/posts${category}`);
        setPosts(res.data); // Actualizar el estado por lo obtenido en 'res'
      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); // Invocando la función
  }, [category]); // Renderizar cuando se cambie de categoría

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 4,
  //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
  //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
  //     img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  // ];

  const getText = (html) => {

    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (

    // En este componente se mostrarán los posteos que hemos realizado
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          // Mapeando los post
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./images/${post.img}`} alt="Post" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}> {/* Nos direccionará a la descripción del post especificado */}
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.description)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;