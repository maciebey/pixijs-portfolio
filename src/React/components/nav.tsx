import * as React from "react";
import './nav.scss';

import { Button } from "./";

interface NavProps {
    changeActive: (newIndex: number) => void;
    activeIndex: number;
}
const Nav = ({
    changeActive,
    activeIndex
}: NavProps) => {
    return (
        <div className="nav">
            <Button onClick={()=>changeActive(0)}
                isActive={activeIndex === 0}
                type="A"
                text="Contact" />
            <Button onClick={()=>changeActive(1)}
                isActive={activeIndex === 1}
                type="A"
                text="Projects" />
        </div>
    )
}

export default Nav;