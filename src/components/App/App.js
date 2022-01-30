import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import Header from '../Header/Header'
import { Container } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <Router> 
        <Header />
        <Container>     
          <Route path="/" exact>
            <MovieList />
          </Route>
          {/* Details page */}
          <Route path="/details/:id" exact>
            <Details />
          </Route>
          {/* Add Movie page */}
        </Container>
      </Router>

    </div>
  );
}


export default App;
