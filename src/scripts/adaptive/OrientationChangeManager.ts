import { EGameSceneEvents, EScreenOrientations } from "../contracts";
import { OrientationUtil } from "../utils/OrientationUtil";

export class OrientationChangeManager {
    private _lastOrientation: EScreenOrientations;
    private _lastEndOrientationChange: ((emitEvent: boolean) => void) | void;
    private _timeOutTimeConfig: number = 500;
    private _timeout: any;

    constructor(private scene: Phaser.Scene) {
        this.init();
    }

    private init(): void {
        this.defineCurrentOrientation();
        this.createResizeEventHandler();
    }

    private createResizeEventHandler(): void {
        window.addEventListener("resize", () => {
            if (this.lastOrientation !== this.currentOrientation) {
                if (this._lastEndOrientationChange) {
                    this._lastEndOrientationChange(false);
                }
                this._lastEndOrientationChange = this.endOrientationChange;

                this._timeout = setTimeout(() => {
                    if (this.lastOrientation !== this.currentOrientation) {
                        this._lastEndOrientationChange!(true);
                    } else {
                        this._lastEndOrientationChange!(false);
                    }
                }, this._timeOutTimeConfig)
            }
        })
    }

    private endOrientationChange(emitEvent: boolean): void {
        clearTimeout(this._timeout);

        this._timeout = null;
        if (emitEvent) {
            const currentOrientation = OrientationUtil.get();

            this.setLastOrientation(currentOrientation);
            this.scene.events.emit(EGameSceneEvents.GAME_SCENE_ORIENTATION_CHANGE);
        }
    }

    private defineCurrentOrientation(): void {
        const currentOrientation = OrientationUtil.get();

        this.setLastOrientation(currentOrientation);
    }

    public setLastOrientation(lastOrientation: EScreenOrientations): void {
        this._lastOrientation = lastOrientation;
    }

    public get currentOrientation(): EScreenOrientations {
        return OrientationUtil.get();
    }

    public get lastOrientation(): EScreenOrientations {
        return this._lastOrientation;
    }
}