import * as React from "react";
import './nav.scss';

interface NavProps {
    changeActive: (newIndex: number) => void;
}
const Nav = ({
    changeActive
}: NavProps) => {
    return (
        <div className="nav">
            <ul>
                <li><a href="#" onClick={()=>changeActive(0)}>Home</a></li>
                <li><a href="#" onClick={()=>changeActive(1)}>About</a></li>
                <li><a href="#" onClick={()=>changeActive(2)}>Contact</a></li>
                <button id="runner-button">Activate Runner</button>
            </ul>
        </div>
    )
}

export default Nav;