// Componente de tipo funcional
// Representará la sección donde se podrá crear nuevos blogs

import { useState } from 'react';
import ReactQuill from 'react-quill'; // Importando este editor de texto que convertirá el texto ingresado en HTML
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';

const Write = () => {

  // Utilizando 'useNavigation' para el manejo de navegación entre rutas
  const navigate = useNavigate();

  // Para saber si estamos para actualizar o crear un nuevo post
  const state = useLocation().state;

  // Utilizando el Hook 'useState' para el manejo de los inputs del formulario
  // Utilizando una condición para saber si hay que inicializar o no estos estados, en base a si estamos para actualizar o crear un nuevo post
  const [title, setTitle] = useState(state?.title || '');
  const [value, setValue] = useState(state?.description || '');
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(state?.category || null);


  // Utilizando 'useEffect' para poder cambiar de editar a crear un nuevo post 
  useEffect(() => {

    setTitle(state?.title || '');
    setValue(state?.description || '');
    setCategory(state?.category || '');
  }, [state]);


  // Método para cargar imágenes desde nuestro servidor
  const upload = async () => {

    try {

      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post("/upload", formData);
      console.log(res.data);
      return res.data;

    } catch (error) {
      console.log(error);
    }
  }


  // Método para insertar un nuevo 'post'
  const handleClick = async (e) => {

    e.preventDefault(); // Para evitar que la página se recargue al dar click en 'Publish'
    const imgUploaded = await upload(); // Invocando la función

    try {

      // Si hay un 'state' es porque vamos a actualizar
      state
        ? await axios.put(`/posts/${state.id}`, {
          title,
          description: value,
          category,
          img: file ? imgUploaded : "",
        })
        // Caso contrario, vamos a crear un nuevo post
        : await axios.post(`/posts/`, {
          title,
          description: value,
          category,
          img: file ? imgUploaded : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  }

  return (

    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <div className="editorContainer">
          {/* Utilizando la librería para mostrar contenido en formato HTML */}
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: 'none' }} type="file" name='' id='file'
            onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={category === "art"}
              name="category"
              value="art"
              id="art"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "science"}
              name="category"
              value="science"
              id="science"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "technology"}
              name="category"
              value="technology"
              id="technology"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "cinema"}
              name="category"
              value="cinema"
              id="cinema"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "design"}
              name="category"
              value="design"
              id="design"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={category === "food"}
              name="category"
              value="food"
              id="food"
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write;