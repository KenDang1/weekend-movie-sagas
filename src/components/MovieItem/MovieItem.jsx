import { useDispatch } from 'react-redux';



function MovieItem ({movie}) {
    const dispatch = useDispatch();

    const movieSelected = (movie) => {
        // get the object from reducer
        dispatch({
            type: 'SET_DETAILS',
            payload: movie
        })
    }
    return (
        <div key={movie.id} onClick={() => movieSelected(movie)}>
            <img src={movie.poster}/> 
            {movie.title}
            {movie.description}
            {/** 👇 this is the movie genres */}
            {movie.name} 
        </div>
    )
}; // end of MovieItem

export default MovieItem;