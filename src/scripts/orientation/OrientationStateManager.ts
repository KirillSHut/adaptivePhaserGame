import { EScreenOrientationWithDevice, IOrientationStateManagedConfig } from "../contracts";
import { OrientationUtil } from "../utils";

export class OrientationStateManager {
    private orientationConfig: IOrientationStateManagedConfig;
    private _currentGameOrientation: EScreenOrientationWithDevice;

    public init(): void {
        this.initCurrentGameOrientation();
    }

    public setConfig(config: IOrientationStateManagedConfig): void {
        this.orientationConfig = config;
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
        const { isOrientationChangeSupported, supportedOrientations, standardOrientation } = this.orientationConfig;

        if (isOrientationChangeSupported && supportedOrientations) return OrientationUtil.getBySupportedOrientations(supportedOrientations, standardOrientation);

        return standardOrientation;
    }
};