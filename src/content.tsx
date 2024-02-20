import * as React from "react";
import { createRoot } from 'react-dom/client';

import Nav from "./components/nav";

const App = () => {
	const [activeIndex, setActiveIndex] = React.useState(0);

	const changeActive = (newIndex: number) => {
		setActiveIndex(newIndex)
	}

	const sections = [
		<div>one</div>,
		<div>two</div>,
		<div>three</div>,
	]

	return (
		<div>
			<Nav changeActive={changeActive} />
			{sections[activeIndex]}
		</div>
	);
}

export const startReact = () => {
	const domNode = document.getElementById('content-container');
	const root = createRoot(domNode);
	root.render(<App />);
}
