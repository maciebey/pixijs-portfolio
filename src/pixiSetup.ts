import { Application, Sprite } from 'pixi.js';

/* create, set configs, and return PIXI.Application */
export const createPixiApplication = (
    containerId: string,
) => {
    const app = new Application<HTMLCanvasElement>({
        resizeTo: window,
    });
    // z-index able chilidren
    app.stage.sortableChildren = true;
    // get element and append canvas
    document.getElementById(containerId).appendChild(app.view);
    // set fps limit
    app.ticker.maxFPS = 60;

    return app
}
