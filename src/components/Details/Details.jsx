// TODO: When a movie poster is clicked, a user should be brought to the `/details` view for that movie.
// This should show all details **including ALL genres** for the selected movie, including title, description, and the image, too! 
// Use Sagas and Redux to handle these requests and data.
// TODO: The details page should have a `Back to List` button, which should bring the user to the Home/List Page
// Hint : You can make a GET request for a specific movie. Remember `req.params` and `:id`?
import { useHistory }  from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function Details () {
    const history = useHistory();
    const dispatch = useDispatch;

    useEffect(() => {

        dispatch({
            type: 'FETCH DETAILS',
            // payload:
        })
    }, []);

    return (
        <>
        
        </>
    )
}; // end of Details

export default Details;