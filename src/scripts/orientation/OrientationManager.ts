import { gameSizeConfig } from "../configs";
import { EOrientationEvents, EScreenOrientations } from "../contracts";
import { SingletonManager } from "../decorators";
import { OrientationChangeBlockersManager } from "./OrientationChangeBlockersManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationManager {
    private orientationChangeBlockersManager: OrientationChangeBlockersManager = SingletonManager.getInstance(OrientationChangeBlockersManager, this.game);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    private _isOrientationChangeDelayed: boolean = false;
    private _timeOutTimeConfig: number = 500;
    private _lastOrientationChangeTimeout: NodeJS.Timeout | null = null;

    // @note Also must be an orientationConfig
    constructor(private game: Phaser.Game) { }

    public init(): void {
        this.orientationChangeBlockersManager.init();
        this.addResizeHandler();
        this.addAllBlockersDeletedHandler();
    }

    private addResizeHandler(): void {
        window.addEventListener("resize", () => {
            if (this.currentGameOrientation !== this.currentWindowOrientation) {
                this.clearLastOrientationChangeTimeout();
                this._lastOrientationChangeTimeout = setTimeout(() => this.varifyOrientationChange(), this._timeOutTimeConfig)
            }
        })
    }

    private addAllBlockersDeletedHandler(): void {
        this.game.events.on(EOrientationEvents.ALL_BLOCKERS_DELETED, () => {
            if (!this.isOrientationChangeDelayed) return;

            this.varifyOrientationChange();
        })
    }

    private varifyOrientationChange(): void {
        switch (true) {
            case (this.areNoBlockersAndOrientationChanged):
                this.clearLastOrientationChangeTimeout();
                this.changeGameOrientation();
                this.setIsOrientationChangeDelayed(false);
                break

            case (this.areBlockersAndOrientationChanged):
                this.setIsOrientationChangeDelayed(true);
                break

            case (this.orientationHasNotChanged):
                this.setIsOrientationChangeDelayed(false);
                break
        }
    }

    private clearLastOrientationChangeTimeout(): void {
        if (this._lastOrientationChangeTimeout === null) return;

        clearTimeout(this._lastOrientationChangeTimeout);
    }

    private changeGameOrientation(): void {
        this.setCurrentGameOrientation(this.currentWindowOrientation);

        this.changeGameSize();
        this.game.events.emit(EOrientationEvents.ORIENTATION_CHANGED, this.currentGameOrientation);
    }

    // @note temprary solution
    public changeGameSize(): void {
        const { width, height } = gameSizeConfig[this.currentGameOrientation];

        this.game.scale.setGameSize(width, height);
        this.game.scale.refresh();
    }

    public setCurrentGameOrientation(orientation: EScreenOrientations): void {
        this.orientationStateManager.setCurrentGameOrientation(orientation);
    }

    private setIsOrientationChangeDelayed(isDelayed: boolean): void {
        this._isOrientationChangeDelayed = isDelayed;
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

    private get isOrientationChangeDelayed(): boolean {
        return this._isOrientationChangeDelayed;
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
