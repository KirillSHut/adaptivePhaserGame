import Bowser from "bowser";
import { EScreenOrientation, EScreenOrientationWithDeviceType, ISupportedDevices, ISupportedOrientations } from "../contracts";

export class OrientationUtil {
    public static getBySupportedOrientations(supportedOrientations: ISupportedOrientations, standardOrientation: EScreenOrientationWithDeviceType): EScreenOrientationWithDeviceType {
        const currentScreenOrientation = this.getCurrentScreenOrientation();
        const supportedDevices = supportedOrientations[currentScreenOrientation];
        const currentDeviceType = this.getCurrentDeviceTypeBySupportedDevices(supportedDevices);

        if (currentDeviceType && supportedDevices) return supportedDevices[currentDeviceType]

        return standardOrientation;
    }

    public static getCurrentDeviceTypeBySupportedDevices(supportedDevices?: ISupportedDevices): string | void {
        if (!supportedDevices) return void "No supported devices for current orientation";

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