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
            <a href="#" onClick={()=>changeActive(0)}>Contact</a>
            <a href="#" onClick={()=>changeActive(1)}>Projects</a>
            {/* <button id="runner-button">Activate Runner</button>
            <button id="shaker-button">Activate Shaker</button> */}
        </div>
    )
}

export default Nav;