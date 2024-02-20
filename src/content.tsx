import * as React from "react"; 
import { createRoot } from 'react-dom/client';

import Nav from "./components/nav";

const App = () =>{
  return (
  	<div>
		<Nav />
		<h1>Hello from React!</h1>
	</div>
  );
}

export const startReact = () => {
	const domNode = document.getElementById('content-container');
	const root = createRoot(domNode);
	root.render(<App />);
}
