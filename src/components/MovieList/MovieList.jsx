import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem'
import { ImageList, Paper} from '@mui/material'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <Paper elevation={20}>
                <section className="list">
                    <ImageList
                        gap={15}
                    >    
                    {movies.map(movie => {
                        return (
                            <MovieItem
                                className="movie"
                                key={movie.id}
                                movie={movie}
                            />
                        );
                    })}
                    </ImageList>
                </section>
            </Paper>
        </main>

    );
}

export default MovieList;