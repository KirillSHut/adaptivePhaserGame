import { EDevices, EScreenOrientation, EScreenOrientationWithDeviceType } from "../contracts";
import { IOrientationConfig } from "../contracts/interface/IOrientationConfig";
import { ISupportedOrientations } from "../contracts/interface/ISupportedOrientations";

export class OrientationConfig implements IOrientationConfig {

    public get orientationChangeDelay(): number {
        return 500;
    }

    public get standardOrientation(): EScreenOrientationWithDeviceType {
        return EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP;
    }

    public get isOrientationChangeSupported(): boolean {
        return true;
    }

    public get supportedOrientations(): ISupportedOrientations {
        return {
            [EScreenOrientation.LANDSCAPE]: {
                [EDevices.DEFAULT]: EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP,
                [EDevices.DESKTOP]: EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP,
                [EDevices.MOBILE]: EScreenOrientationWithDeviceType.LANDSCAPE_MOBILE,
            },
            [EScreenOrientation.PORTRAIT]: {
                [EDevices.DEFAULT]: EScreenOrientationWithDeviceType.PORTRAIT_MOBILE,
                [EDevices.DESKTOP]: EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP,
                [EDevices.MOBILE]: EScreenOrientationWithDeviceType.PORTRAIT_MOBILE
            }
        }
    }
}