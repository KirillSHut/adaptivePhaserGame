import { EScreenOrientations } from "../contracts";


export const gameSizeConfig = {
    [EScreenOrientations.LANDSCAPE_DESKTOP]: {
        width: 1920,
        height: 1080
    },
    [EScreenOrientations.LANDSCAPE_MOBILE]: {
        width: 1920,
        height: 1080
    },
    [EScreenOrientations.PORTRAIT_MOBILE]: {
        width: 1080,
        height: 1920
    },
}