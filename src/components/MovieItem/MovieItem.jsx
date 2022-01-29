import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'


function MovieItem ({movie}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const movieSelected = (movie) => {
        // get the object from reducer
        dispatch({
            type: 'SET_SELECTED_MOVIE',
            payload: movie
        })
        // click on the movie and it take you to the details page
        history.push('/details');
    }
    // need to style this more 👇
    return (
        <div key={movie.id} onClick={() => movieSelected(movie)}>
            {movie.title}
            <img src={movie.poster}/> 
        </div>
    )
}; // end of MovieItem

export default MovieItem;