import { EScreenOrientationWithDeviceType } from "../contracts";


export const gameSizeConfig = {
    [EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP]: {
        width: 1920,
        height: 1080
    },
    [EScreenOrientationWithDeviceType.LANDSCAPE_MOBILE]: {
        width: 1920,
        height: 1080
    },
    [EScreenOrientationWithDeviceType.PORTRAIT_MOBILE]: {
        width: 1080,
        height: 1920
    },
}