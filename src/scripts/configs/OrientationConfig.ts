import { EScreenOrientationWithDevice } from "../contracts";
import { IOrientationConfig } from "../contracts/interface/IOrientationConfig";
import { ISupportedOrientations } from "../contracts/interface/ISupportedOrientations";

export class OrientationConfig implements IOrientationConfig {

    public get orientationChangeTimeoutDuration(): number {
        return 500;
    }

    public get defaultOrientation(): EScreenOrientationWithDevice {
        return EScreenOrientationWithDevice.LANDSCAPE_DESKTOP;
    }

    public get isOrientationChangeSupported(): boolean {
        return true;
    }

    public get supportedOrientations(): ISupportedOrientations {
        return {
            landscape: {
                default: EScreenOrientationWithDevice.LANDSCAPE_DESKTOP,
                desktop: EScreenOrientationWithDevice.LANDSCAPE_DESKTOP,
                mobile: EScreenOrientationWithDevice.LANDSCAPE_MOBILE
            },
            portrait: {
                default: EScreenOrientationWithDevice.PORTRAIT_MOBILE,
                desktop: EScreenOrientationWithDevice.PORTRAIT_DESKTOP,
                mobile: EScreenOrientationWithDevice.PORTRAIT_MOBILE
            }
        }
    }
}