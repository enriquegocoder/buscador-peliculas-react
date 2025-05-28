import { useState } from 'react';

export const BuscadorPeliculas = () => {

    const API_KEY = '65e418e4985bf2fdec2ec7223f518f23'; // Reemplaza con tu clave de API
    const URL_BASE = 'https://api.themoviedb.org/3/search/movie';

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (busqueda.trim() === '') {
            alert('Por favor, ingresa un título de película');
            return;
        }
        console.log(`Buscando películas con el título: ${busqueda}`);
        fetcPeliculas(busqueda);
        setBusqueda(''); // Limpiar el campo de búsqueda después de enviar      
    }


    const fetcPeliculas = async () => {
        try {
            const response = await fetch(`${URL_BASE}?api_key=${API_KEY}&query=${encodeURIComponent(busqueda)}&language=es-ES&page=1`);
            const data = await response.json();
            setPeliculas(data);

        } catch (error) {
            console.error('Error al buscar películas:', error);
        }
    }

    return (
        <div className="container">

            <h1 className="title">Buscador de Películas</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Titulo ..."
                    value={busqueda}
                    onChange={handleInputChange}
                />
                <button type="submit" className="search-button">Buscar</button>
            </form>
            <div className='movie-list'>
                {peliculas.results && peliculas.results.length > 0 ? (
                    peliculas.results.map((pelicula) => (
                        <div key={pelicula.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                                alt={pelicula.title}
                                className="movie-poster" />
                            <h2>{pelicula.title}</h2>
                            <p>{pelicula.overview}</p>
                            <p><strong>Fecha de estreno:</strong> {pelicula.release_date}</p>
                            <p><strong>Idioma:</strong> {pelicula.original_language}</p>
                            <p><strong>Adulto:</strong> {pelicula.adult ? 'Sí' : 'No'}</p>
                            <p><strong>Original Título:</strong> {pelicula.original_title}</p>
                            <p><strong>Duración:</strong> {pelicula.runtime} minutos</p>
                            <p><strong>Calificación:</strong> {pelicula.vote_average}</p>
                            <p><strong>Votantes:</strong> {pelicula.vote_count}</p>
                            <p><strong>Votación promedio:</strong> {pelicula.vote_average}</p>
                            <p><strong>Popularidad:</strong> {pelicula.popularity}</p>
                            <p><strong>ID:</strong> {pelicula.id}</p>
                            <p><strong>Géneros:</strong> {pelicula.genre_ids.join(', ')}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron películas.</p>
                )}
            </div>
        </div>
    )
}
