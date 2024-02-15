import { EOrientationEvents, EScreenOrientations } from "../contracts";
import { SingletonManager } from "../manager";
import { OrientationChangeBlockersManager } from "./OrientationChangeBlockersManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationChangeManager {
    private orientationChangeBlockersManager: OrientationChangeBlockersManager = SingletonManager.getInstance(OrientationChangeBlockersManager, this.scene);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);
    private _lastEndOrientationChange: ((emitEvent: boolean) => void) | void;
    private _timeOutTimeConfig: number = 500;
    private _timeout: NodeJS.Timeout | null = null;

    constructor(private scene: Phaser.Scene) {
        this.init();
    }

    private init(): void {
        this.handleResize();
    }

    public setScene(scene: Phaser.Scene): void {
        this.scene = scene;

        this.orientationChangeBlockersManager.setScene(scene);
    }

    private handleResize(): void {
        window.addEventListener("resize", () => {
            if (this.currentGameOrientation !== this.currentWindowOrientation) {
                if (this._lastEndOrientationChange) {
                    this._lastEndOrientationChange(false);
                }
                this._lastEndOrientationChange = this.endOrientationChange;

                this._timeout = setTimeout(() => this.varifyOrientationChange(), this._timeOutTimeConfig)
            }
        })
    }

    private varifyOrientationChange(): void {
        switch (true) {
            case (this.areNoBlockersAndOrientationChanged):
                this._lastEndOrientationChange!(true);
                this.clearDelayedOrientationChangeCall();
                break

            case (this.areBlockersAndOrientationChanged):
                this.setDelayedOrientationChange();
                break

            case (this.orientationHasNotChanged):
                this.clearDelayedOrientationChangeCall();
                break
        }
    }

    private clearDelayedOrientationChangeCall(): void {
        this.orientationChangeBlockersManager.clearDelayedOrientationChange();
    }

    private setDelayedOrientationChange(): void {
        this.orientationChangeBlockersManager.delayedOrientationChange = this.varifyOrientationChange.bind(this);
    }

    private get areNoBlockersAndOrientationChanged(): boolean {
        return !this.hasBlockers && (this.currentGameOrientation !== this.currentWindowOrientation);
    }

    private get areBlockersAndOrientationChanged(): boolean {
        return this.hasBlockers && (this.currentGameOrientation !== this.currentWindowOrientation);
    }

    private get orientationHasNotChanged(): boolean {
        return this.currentGameOrientation === this.currentWindowOrientation;
    }

    private endOrientationChange(emitEvent: boolean): void {
        if (this._timeout !== null) clearTimeout(this._timeout);

        this._timeout = null;
        if (emitEvent) {
            const currentWindowOrientation = this.currentWindowOrientation;

            this.setCurrentGameOrientation(currentWindowOrientation);
            this.scene.events.emit(EOrientationEvents.ORIENTATION_CHANGED);
        }
    }

    public setCurrentGameOrientation(orientation: EScreenOrientations): void {
        this.orientationStateManager.setCurrentGameOrientation(orientation);
    }

    public get currentWindowOrientation(): EScreenOrientations {
        return this.orientationStateManager.currentWindowOrientation;
    }

    public get currentGameOrientation(): EScreenOrientations {
        return this.orientationStateManager.currentGameOrientation;
    }

    public get hasBlockers(): boolean {
        return this.orientationChangeBlockersManager.hasBlockers;
    }
}
