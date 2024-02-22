import { EScreenOrientations } from "../../contracts";


export const gameSceneTextConfig = {
    [EScreenOrientations.LANDSCAPE_DESKTOP]: {
        text: `Orientation: ${EScreenOrientations.LANDSCAPE_DESKTOP}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
    [EScreenOrientations.LANDSCAPE_MOBILE]: {
        text: `Orientation: ${EScreenOrientations.LANDSCAPE_MOBILE}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
    [EScreenOrientations.PORTRAIT_MOBILE]: {
        text: `Orientation: ${EScreenOrientations.PORTRAIT_MOBILE}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
}