import Bowser from "bowser";
import { EDevices, EScreenOrientation, EScreenOrientationWithDeviceType, ISupportedDevices, ISupportedOrientations } from "../contracts";

export class OrientationUtil {
    public static getBasedOnSupported(supportedOrientations: ISupportedOrientations, standardOrientation: EScreenOrientationWithDeviceType): EScreenOrientationWithDeviceType {
        const currentScreenOrientation = this.getScreenOrientation();
        const supportedDevices = supportedOrientations[currentScreenOrientation];
        const currentDeviceType = this.getDeviceTypeBasedOnSupported(supportedDevices);

        if (currentDeviceType && supportedDevices) return supportedDevices[currentDeviceType]

        return standardOrientation;
    }

    public static getDeviceTypeBasedOnSupported(supportedDevices?: ISupportedDevices): string | void {
        if (!supportedDevices) return;

        const currentDeviceType = this.getDeviceType();

        return supportedDevices[currentDeviceType] !== undefined ? currentDeviceType : EDevices.DEFAULT;
    }

    public static getDeviceType(): string {
        const deviceType = Bowser.parse(window.navigator.userAgent).platform.type;

        return deviceType ?? EDevices.DEFAULT;
    }

    public static getScreenOrientation(): EScreenOrientation {
        return window.innerHeight > window.innerWidth ? EScreenOrientation.PORTRAIT : EScreenOrientation.LANDSCAPE;
    }
}