import { Application, Polygon, Graphics } from 'pixi.js';
import { Actions, Interpolations } from 'pixi-actions';
import '@pixi/graphics-extras';

import { vertDistance } from './config';

interface GraphicsState {
    name: string;
    priority: number;
    actionSequence: Actions[];
}
interface graphicsState {
    graphics: Graphics;
    state: GraphicsState;
}
const graphicStateArr: graphicsState[][] = [];

let rowLength = 0;
let rowCount = 0;

const polyTest = (app: Application<HTMLCanvasElement>) => {
    // let offSetX: number;
    console.log(window.innerWidth, window.innerHeight)
    rowCount = Math.ceil(window.innerHeight / vertDistance) + 1;
    rowLength = Math.ceil(window.innerWidth / 50) + 1;
    for (let i = 0; i < rowCount; i++) {
        // offSetX = i % 2 === 0 ? 0 : 25;
        const row: graphicsState[] = [];
        for (let j = 0; j < rowLength; j++) {
            const graphics = new Graphics();
            graphics.beginFill(0x000000);
            graphics.drawRegularPolygon(0, 0, 28.87, 6);
            graphics.endFill();
            if (j === 0) {
                graphics.beginFill(0x1C189F);
            } else {
                graphics.beginFill(0xDE3249);
            }
            graphics.drawRegularPolygon(0, 0, 27.87, 6);
            graphics.x = j * 50 + (i % 2 === 0 ? 0 : 25);
            graphics.y = i * vertDistance;
            const state: GraphicsState = {
                name: 'idle',
                priority: 0,
                actionSequence: []
            }
            app.stage.addChild(graphics);
            row.push({graphics, state});
        }
        graphicStateArr.push(row);
    }

    const j = 0
    for (let i=0; i<graphicStateArr[0].length; i++) {
        for(const gsRow of graphicStateArr) {
            // const gsRow = graphicStateArr[0];
            const {graphics} = gsRow[i];
            setTimeout(() => {
                Actions.repeat(
                    Actions.sequence(
                        Actions.scaleTo(graphics,  1.25, 1.25, 2, Interpolations.smooth),
                        Actions.scaleTo(graphics,   .75,  .75, 2, Interpolations.smooth),
                    )
                ).play();
            }, 1000 + (i * 100));
        }
    }
}

export { polyTest };