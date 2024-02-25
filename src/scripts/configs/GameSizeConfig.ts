import { EScreenOrientationWithDevice } from "../contracts";


export const gameSizeConfig = {
    [EScreenOrientationWithDevice.LANDSCAPE_DESKTOP]: {
        width: 1920,
        height: 1080
    },
    [EScreenOrientationWithDevice.LANDSCAPE_MOBILE]: {
        width: 1920,
        height: 1080
    },
    [EScreenOrientationWithDevice.PORTRAIT_MOBILE]: {
        width: 1080,
        height: 1920
    },
}