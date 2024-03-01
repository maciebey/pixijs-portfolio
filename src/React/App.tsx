import * as React from "react";
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import { Nav, TileSettings } from "./components";
import { Section1, Projects } from "./pages";
import { getTilerInstance } from "../PixiTiler";

import './App.scss';

const App = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        // let App render then remove hidden class
        setTimeout(() => {
            setIsLoaded(true)
        }, 1)
    }, [])

    const changeActive = (newIndex: number) => {
        setActiveIndex(newIndex)
        getTilerInstance().activateRunner();
    }

    const sections = [
        <Section1 />,
        <Projects />,
    ]

    return (
        <>
            <div className={`main ${isLoaded ? '' : 'hidden'}`} key='main'>
                <Nav activeIndex={activeIndex} changeActive={changeActive} />
                <ReactCSSTransitionReplace
                    transitionName="fade-wait"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={400}
                >
                    <div key={`display-${activeIndex}`}>
                        {sections[activeIndex]}
                    </div>
                </ReactCSSTransitionReplace>
            </div>
            <TileSettings />
        </>
    );
}

export default App;
