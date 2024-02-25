import { EScreenOrientationWithDevice, IOrientationStateManagedConfig } from "../contracts";
import { OrientationUtil } from "../utils";

export class OrientationStateManager {
    private orientationConfig: IOrientationStateManagedConfig;
    private _currentGameOrientation: EScreenOrientationWithDevice;

    public init(config: IOrientationStateManagedConfig): void {
        this.orientationConfig = config;

        this.initCurrentGameOrientation();
    }

    private initCurrentGameOrientation(): void {
        this.setCurrentGameOrientation(this.currentWindowOrientation);
    }

    public get currentGameOrientation(): EScreenOrientationWithDevice {
        return this._currentGameOrientation;
    }

    public setCurrentGameOrientation(currentGameOrientation: EScreenOrientationWithDevice) {
        this._currentGameOrientation = currentGameOrientation;
    }

    public get currentWindowOrientation(): EScreenOrientationWithDevice {
        const { isOrientationChangeSupported, supportedOrientations, defaultOrientation } = this.orientationConfig;

        if (isOrientationChangeSupported) return OrientationUtil.getBySupportedOrientations(supportedOrientations);

        return defaultOrientation;
    }
};