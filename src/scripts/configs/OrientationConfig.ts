import { EScreenOrientationWithDeviceType } from "../contracts";
import { IOrientationConfig } from "../contracts/interface/IOrientationConfig";
import { ISupportedOrientations } from "../contracts/interface/ISupportedOrientations";

export class OrientationConfig implements IOrientationConfig {

    public get orientationChangeTimeoutDuration(): number {
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
            landscape: {
                default: EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP,
                desktop: EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP,
                mobile: EScreenOrientationWithDeviceType.LANDSCAPE_MOBILE
            },
            portrait: {
                default: EScreenOrientationWithDeviceType.PORTRAIT_MOBILE,
                desktop: EScreenOrientationWithDeviceType.LANDSCAPE_DESKTOP,
                mobile: EScreenOrientationWithDeviceType.PORTRAIT_MOBILE
            }
        }
    }
}