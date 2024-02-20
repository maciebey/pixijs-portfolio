import { Application } from 'pixi.js';

import { COLORS } from './config';

/* create, set configs, and return PIXI.Application */
export const createPixiApplication = (
    containerId: string,
) => {
    const app = new Application<HTMLCanvasElement>({
        resizeTo: window,
        backgroundColor: COLORS.THREE
    });
    // z-index able chilidren
    app.stage.sortableChildren = true;
    // get element and append canvas
    document.getElementById(containerId).appendChild(app.view);
    // set fps limit
    app.ticker.maxFPS = 60;

    return app
}
