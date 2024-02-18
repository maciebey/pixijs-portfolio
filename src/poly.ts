import { Application, Polygon, Graphics } from 'pixi.js';
import { Actions, Interpolations } from 'pixi-actions';
import '@pixi/graphics-extras';

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
const polyTest = (app: Application<HTMLCanvasElement>) => {
    for (let i = 0; i < 6; i++) {
        const row: graphicsState[] = [];
        for (let j = 0; j < 6; j++) {
            const graphics = new Graphics();
            graphics.beginFill(0xDE3249);
            graphics.drawRegularPolygon(0, 0, 28.87, 6);
            graphics.endFill();
            graphics.x = 50 + j * 100;
            graphics.y = 50 + i * 100;
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
                        Actions.scaleTo(graphics, 2, 2,   1, Interpolations.smooth),
                        Actions.scaleTo(graphics, .5, .5, 1, Interpolations.smooth),
                    )
                ).play();
            }, 1000 + (i * 100));
        }
    }
}

export { polyTest };