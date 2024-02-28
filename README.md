# Portfolio with Tiling Background

Portfolio website written in Typescript. Featuring dynamic tiling background created with 2D WebGL renderer [PixiJS](https://pixijs.com/).

The live version is available here: [https://www.mbdv.io/](https://www.mbdv.io/)

## Intro
The primary feature of this portfolio is the tiling background, chosen simply by my interest in mathematical tiling. Currently, the source code for this project is rough and the code is a mix of my tiling implementation along with React for displaying my portfolio content. As I continue to experiment and refine the tiling I plan to refactor it as a package in a separate repo.

## Feature Roadmap
- Tile Coloring
- More Tiling Shapes
- Better Content Transitioning
- Content Update as Needed

## Local development
After cloning the repo, packages can be installed with:

    `npm i`
    
Webpack-dev-server can be started and file changes watched with:

    `npm run dev`

The project will be accessible at `http://localhost:3000/`. The port can be configured in `config/webpack.dev.js`. 

Currently dev command is configured to allow access to the dev server from your local network at `http://<<lan-ip>>:3000/`, this can be disabled by removing `--host 0.0.0.0` from the dev script definition in `package.json`.
