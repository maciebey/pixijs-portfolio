import * as React from 'react';
import { makeLink } from './Section1';


const Projects = () => {
    return (
        <div>
            <h1>Projects</h1>
            <hr />
            <h2>www.mbdv.io</h2>
            <p><b>Tech:</b> TypeScript, React, pixi.js, Self Hosted, Cloudflare, Docker</p>
            <p><b>Source:</b>{makeLink('Github', 'https://github.com/maciebey/pixijs-portfolio')}</p>
            <hr />
            <h2>Great Wave</h2>
            <p><b>Description:</b> Interactive SVG manipulator.</p>
            <p><b>Tech:</b> TypeScript, React, Redux</p>
            <p><b>Live:</b>{makeLink('Github Pages', 'https://maciebey.github.io/great-wave/')}</p>
            <p><b>Source:</b>{makeLink('Github', 'https://github.com/maciebey/great-wave')}</p>
            <hr />
            <h2>Sound Mixer</h2>
            <p><b>Description:</b> Small application to mix YouTube video w/ audio files.</p>
            <p><b>Tech:</b> TypeScript, React, Redux, Node.js</p>
            <p><b>Source Front-End:</b>{makeLink('Github', 'https://github.com/maciebey/equalizer')}</p>
            <p><b>Source Back-End:</b>{makeLink('Github', 'https://github.com/maciebey/equalizer-api')}</p>
        </div>
    );
}

export default Projects;