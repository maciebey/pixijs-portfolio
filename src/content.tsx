import * as React from "react";
import { createRoot } from 'react-dom/client';

import Nav from "./components/nav";
import { Section1, Projects } from "./pages";

const App = () => {
	const [activeIndex, setActiveIndex] = React.useState(0);

	const changeActive = (newIndex: number) => {
		setActiveIndex(newIndex)
	}

	const sections = [
		<Section1 />,
		<Projects />,
		<div>three</div>,
	]

	return (
		<div>
			<Nav activeIndex={activeIndex} changeActive={changeActive} />
			{sections[activeIndex]}
		</div>
	);
}

export const startReact = () => {
	const domNode = document.getElementById('content-container');
	const root = createRoot(domNode);
	root.render(<App />);
}
