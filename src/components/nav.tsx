import * as React from "react";
import './nav.scss';

const Nav = () => {
    return (
        <div className="nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
                <button id="runner-button">Activate Runner</button>
            </ul>
        </div>
    )
}

export default Nav;