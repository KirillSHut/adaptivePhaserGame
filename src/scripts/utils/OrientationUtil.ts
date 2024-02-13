import Bowser from "bowser";
import { EScreenOrientations } from "../contracts";

export class OrientationUtil {
    public static get(): EScreenOrientations {
        const deviceType = Bowser.parse(window.navigator.userAgent).platform.type;

        if (window.innerWidth > window.innerHeight) {
            return deviceType === "desktop" ? EScreenOrientations.LANDSCAPE_DESKTOP : EScreenOrientations.LANDSCAPE_MOBILE;
        }

        return deviceType === "desktop" ? EScreenOrientations.PORTRAIT_DESKTOP : EScreenOrientations.PORTRAIT_MOBILE;
    }
}