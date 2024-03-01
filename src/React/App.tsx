import * as React from "react";
import ReactCSSTransitionReplace from 'react-css-transition-replace';

import Nav from "./components/nav";
import { Section1, Projects } from "./pages";
import { getTilerInstance } from "../poly";

import './App.scss';

const App = () => {
	const [activeIndex, setActiveIndex] = React.useState(0);

	const changeActive = (newIndex: number) => {
		setActiveIndex(newIndex)
		getTilerInstance().activateRunner();
	}

	const sections = [
		<Section1 />,
		<Projects />,
	]

	return (
		<div>
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
	);
}

export default App;
