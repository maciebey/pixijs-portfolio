import * as React from "react"; 
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

export const startReact = () => {
	console.log('Starting React');
	const domNode = document.getElementById('content-container');
	console.log(domNode)
	const root = createRoot(domNode);
	root.render(<NavigationBar />);
}
