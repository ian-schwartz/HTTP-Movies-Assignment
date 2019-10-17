import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const UpdateMovie = props => {
    console.log(props);
    const [movie, setMovie] = useState(initialMovie);

    const fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.log(err.response));
    };

    useEffect(() => {
        fetchMovie(props.match.params.id);
    }, [props.match.params.id]);

    const handleChange = e => setMovie({ ...movie, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(res => {
              console.log(res);
              props.history.push('/');
          })
          .catch(err => console.log(err.response));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
              type='text'
              name='title'
              placeholder='title'
              value={movie.title}
              onChange={handleChange} 
            />
            <input 
              type='text'
              name='director'
              placeholder='director'
              value={movie.director}
              onChange={handleChange} 
            />
            <input 
              type='text'
              name='metascore'
              placeholder='title'
              value={movie.metascore}
              onChange={handleChange} 
            />
            <button type='submit'>Update Movie</button>
        </form>
    );
};

export default UpdateMovie;