// TODO: When a movie poster is clicked, a user should be brought to the `/details` view for that movie.
// This should show all details **including ALL genres** for the selected movie, including title, description, and the image, too! 
// Use Sagas and Redux to handle these requests and data.
// TODO: The details page should have a `Back to List` button, which should bring the user to the Home/List Page
// Hint : You can make a GET request for a specific movie. Remember `req.params` and `:id`?
import { useHistory, useParams }  from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, List, ListItem, ListItemText } from '@material-ui/core'



function Details () {
    const history = useHistory();
    const dispatch = useDispatch();
    // So by doing this, the page should not going into Error
    // if I read the notes right
    const { id } = useParams();
    console.log('params ID is:', id);

    // grabbing the state selectedMovie reducer from the store
    // const movieSelected = useSelector(store => store.movieSelected);
    // console.log('movie selected in details:', movieSelected);

    // same thing grabbing the state
    const movieDetails = useSelector(store => store.movieDetails);
    console.log('movie detail got selected details.jsx', movieDetails);

    useEffect(() => {
        dispatch({
            type: 'FETCH_DETAILS',
            payload: id
        })
    }, []);


    // when clicked the button it take user back to the List Page
    const backToHome = () => {
        history.push('/');
    }

    return (
        <Container className='detailContainer'>
        <h1>Movie Selected</h1>
        { movieDetails[0] ? (
            <>
                <h3>{movieDetails[0].title}</h3>
                <img src={movieDetails[0].poster}/>
                <p>{movieDetails[0].description}</p>
                <h3>Genres</h3>
                <List>
                    { movieDetails[0].genres?.map((genre, i) =>
                        <ListItem key={i}>{genre}</ListItem>
                        )}
                </List>
            </>
        ) : (null)}
        </Container>
    )
}; // end of Details

export default Details;