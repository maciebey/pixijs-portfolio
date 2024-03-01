import * as React from "react";
import { createRoot } from 'react-dom/client';
import App from './React/App';

export const setupReact = () => {
	const domNode = document.getElementById('react-container');
	const root = createRoot(domNode);
	root.render(<App />);
}
