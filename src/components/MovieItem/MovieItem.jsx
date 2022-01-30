import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'


function MovieItem ({movie}) {
    const dispatch = useDispatch();
    const history = useHistory();



    const movieSelected = (movie) => {
        console.log('movie clicked on movieItem', movie);
        // get the object from reducer
        // dispatch({
        //     type: 'SET_SELECTED_MOVIE',
        //     payload: movie
        // })
        // click on the movie and it take you to the details page
        // bring the movie id with
        history.push(`/details/${movie.id}`);
    }
    // need to style this more 👇
    return (
        <div key={movie.id} onClick={() => movieSelected(movie)}>
            <p>{movie.title}</p>
            <img src={movie.poster}/> 
        </div>
    )
}; // end of MovieItem

export default MovieItem;