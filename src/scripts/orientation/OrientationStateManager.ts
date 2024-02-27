import { EScreenOrientationWithDeviceType, IOrientationStateManagerConfig } from "../contracts";
import { OrientationUtil } from "../utils";

export class OrientationStateManager {
    private orientationConfig: IOrientationStateManagerConfig;
    private _currentGameOrientation: EScreenOrientationWithDeviceType;

    public init(): void {
        this.initCurrentGameOrientation();
    }

    public setConfig(config: IOrientationStateManagerConfig): void {
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

        if (isOrientationChangeSupported && supportedOrientations) return OrientationUtil.getBasedOnSupported(supportedOrientations, standardOrientation);

        return standardOrientation;
    }
};