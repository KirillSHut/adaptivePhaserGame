import { EScreenOrientationWithDeviceType } from "../../contracts";


export const gameSceneTextConfig = {
    [EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP]: {
        text: `Orientation: ${EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
    [EScreenOrientationWithDeviceType.LANDSCAPE_MOBILE]: {
        text: `Orientation: ${EScreenOrientationWithDeviceType.LANDSCAPE_MOBILE}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
    [EScreenOrientationWithDeviceType.PORTRAIT_MOBILE]: {
        text: `Orientation: ${EScreenOrientationWithDeviceType.PORTRAIT_MOBILE}`,
        styles: {
            color: '#000000',
            fontSize: '60px'
        }
    },
}