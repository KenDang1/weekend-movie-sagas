import { Link } from "react-router-dom";
import './Header.css';

function Header () {
    return(
        <div className="Header">
            <h1>The Movies Saga!</h1>
            <div className="container">
                <nav className="navLink">
                    <Link className="linkPage" to="/">
                        Movie List
                    </Link>
                </nav>
                {/** can't use this part unless I figure out how to stop the refresh error on detail page */}
                {/* <nav className="navLink">
                    <Link className="linkPage" to="/details">
                        Details
                    </Link>
                </nav> */}
            </div>

        </div>
    )
};

export default Header;