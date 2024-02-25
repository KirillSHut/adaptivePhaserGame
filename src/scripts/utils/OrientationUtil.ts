import Bowser from "bowser";
import { EScreenOrientation, EScreenOrientationWithDevice, ISupportedDevices, ISupportedOrientations } from "../contracts";

export class OrientationUtil {
    public static getBySupportedOrientations(supoportedOrientations: ISupportedOrientations): EScreenOrientationWithDevice {
        const currentScreenOrientation = this.getCurrentScreenOrientation();
        const supportedDevices = supoportedOrientations[currentScreenOrientation];
        const currentDeviceType = this.getCurrentDeviceTypeBySupportedDevices(supportedDevices);

        return supoportedOrientations[currentScreenOrientation][currentDeviceType];
    }

    public static getCurrentDeviceTypeBySupportedDevices(supportedDevices: ISupportedDevices): string {
        const currentDeviceType = this.getCurrentDeviceType();

        return supportedDevices[currentDeviceType] !== undefined ? currentDeviceType : "default";
    }

    public static getCurrentDeviceType(): string {
        const deviceType = Bowser.parse(window.navigator.userAgent).platform.type;

        return deviceType ? deviceType : "default";
    }

    public static getCurrentScreenOrientation(): EScreenOrientation {
        return window.innerWidth > window.innerHeight ? EScreenOrientation.LANDSCAPE : EScreenOrientation.PORTRAIT;
    }
}