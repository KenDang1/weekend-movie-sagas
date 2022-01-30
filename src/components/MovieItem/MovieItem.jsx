import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import './MovieItem.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';




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
        <Card 
            className="cardClass"
            sx={{ maxWidth: 350 }}
            key={movie.id}
            onClick={() => movieSelected(movie)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image={movie.poster}
                    />
                    <CardContent>
                        <Typography
                            variant="caption">{movie.title}</Typography>
                    </CardContent>
                </CardActionArea>
        </Card>
    )
}; // end of MovieItem

export default MovieItem;