import { EScreenOrientationWithDeviceType, IOrientationStateManagedConfig } from "../contracts";
import { OrientationUtil } from "../utils";

export class OrientationStateManager {
    private orientationConfig: IOrientationStateManagedConfig;
    private _currentGameOrientation: EScreenOrientationWithDeviceType;

    public init(): void {
        this.initCurrentGameOrientation();
    }

    public setConfig(config: IOrientationStateManagedConfig): void {
        this.orientationConfig = config;
    }

    private initCurrentGameOrientation(): void {
        this.setCurrentGameOrientation(this.currentWindowOrientation);
    }

    public get currentGameOrientation(): EScreenOrientationWithDeviceType {
        return this._currentGameOrientation;
    }

    public setCurrentGameOrientation(currentGameOrientation: EScreenOrientationWithDeviceType) {
        this._currentGameOrientation = currentGameOrientation;
    }

    public get currentWindowOrientation(): EScreenOrientationWithDeviceType {
        const { isOrientationChangeSupported, supportedOrientations, standardOrientation } = this.orientationConfig;

        if (isOrientationChangeSupported && supportedOrientations) return OrientationUtil.getBySupportedOrientations(supportedOrientations, standardOrientation);

        return standardOrientation;
    }
};