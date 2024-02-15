import { EScreenOrientations } from "../contracts";
import { OrientationUtil } from "../utils";

export class OrientationStateManager {
    private _currentGameOrientation: EScreenOrientations;

    constructor() {
        this.init();
    }

    public init(): void {
        this.initCurrentaGameOrientation();
    }

    public initCurrentaGameOrientation(): void {
        this._currentGameOrientation = OrientationUtil.get();
    }

    public get currentGameOrientation(): EScreenOrientations {
        return this._currentGameOrientation;
    }

    public setCurrentGameOrientation(currentGameOrientation: EScreenOrientations) {
        this._currentGameOrientation = currentGameOrientation;
    }

    public get currentWindowOrientation(): EScreenOrientations {
        return OrientationUtil.get();
    }
}