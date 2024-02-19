import { Application, Sprite } from 'pixi.js';
import { Actions } from 'pixi-actions';

import { setupTile, activateRunner } from './poly';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new Application<HTMLCanvasElement>({
    resizeTo: window,
});
app.stage.sortableChildren = true;

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
// const texture = await Assets.load('bunny.png');

// This creates a texture from a 'bunny.png' image
const bunny = Sprite.from('assets/bunny.png');

// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

// Rotate around the center
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;

// Add the bunny to the scene we are building
app.stage.addChild(bunny);

app.ticker.maxFPS = 60;

// Listen for frame updates
app.ticker.add((delta) => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.02;
    Actions.tick(delta/60)
});

// create tile
setupTile(app);

window.onload = () => {
    // window.addEventListener('mousemove', (event) => {
    //     updateHover(event);
    // });

    // button listeners
    document.getElementById("runner-button").onclick = (event) => {
        activateRunner();
    }

    // setInterval(() => {
    //     activateRunner();
    // }, 5000);
}
