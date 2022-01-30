import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}

function* fetchDetails (action) {
    // I can leave it as action.payload but 
    // changing it to id easier to read for me
    const id = action.payload
    console.log('id is in index fetchDetails', id);
    
    try{
        const response = yield axios.get(`/api/movie/${id}`)
        console.log('response.data is', response.data );
        
        // call the movieDetails reducer
        // set the details into the state
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        }) 
    }
    catch (err) {
        console.log('get all details error', err);
    }
}; // end of fetchDetails

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);

        yield put({ 
            type: 'SET_MOVIES', 
            payload: movies.data 
        });

    } catch {
        console.log('get all error');
    }
        
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// same as details so when movie is clicked on 
// set a state for that movie got selected
const movieSelected = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// used to hold Details
// state would be an empty object
// because what it set will be a single object movie details
const movieDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
} 

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetails,
        movieSelected,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
    ,document.getElementById('root'));
