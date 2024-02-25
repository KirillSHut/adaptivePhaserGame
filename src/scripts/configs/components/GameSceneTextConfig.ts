import { EScreenOrientationWithDevice } from "../../contracts";


export const gameSceneTextConfig = {
    [EScreenOrientationWithDevice.LANDSCAPE_DESKTOP]: {
        text: `Orientation: ${EScreenOrientationWithDevice.LANDSCAPE_DESKTOP}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
    [EScreenOrientationWithDevice.LANDSCAPE_MOBILE]: {
        text: `Orientation: ${EScreenOrientationWithDevice.LANDSCAPE_MOBILE}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
    [EScreenOrientationWithDevice.PORTRAIT_MOBILE]: {
        text: `Orientation: ${EScreenOrientationWithDevice.PORTRAIT_MOBILE}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
}