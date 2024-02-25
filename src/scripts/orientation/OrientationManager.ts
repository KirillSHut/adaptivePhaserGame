import { gameSizeConfig } from "../configs";
import { EOrientationEvents, EScreenOrientationWithDevice } from "../contracts";
import { IOrientationConfig } from "../contracts/interface/IOrientationConfig";
import { SingletonManager } from "../decorators";
import { OrientationChangeBlockersManager } from "./OrientationChangeBlockersManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationManager {
    private orientationChangeBlockersManager: OrientationChangeBlockersManager = SingletonManager.getInstance(OrientationChangeBlockersManager, this.game);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    private _isOrientationChangeDelayed: boolean = false;
    private _lastOrientationChangeTimeout: NodeJS.Timeout | null = null;

    constructor(private game: Phaser.Game, private config: IOrientationConfig) { }

    public init(): void {
        const { isOrientationChangeSupported, defaultOrientation, supportedOrientations } = this.config;

        if (isOrientationChangeSupported) {
            this.orientationChangeBlockersManager.init();
            this.addResizeHandler();
            this.addAllBlockersDeletedHandler();
        }

        this.orientationStateManager.init({ isOrientationChangeSupported, defaultOrientation, supportedOrientations });
        this.changeGameSize();
    }

    private addResizeHandler(): void {
        const resizeHandler = this.getResizeHandler();

        window.addEventListener("resize", () => {
            if (this.currentGameOrientation !== this.currentWindowOrientation) resizeHandler();
        })
    }

    private resizeHandlerWithTimeout(): void {
        this.clearLastOrientationChangeTimeout();
        this._lastOrientationChangeTimeout = setTimeout(() => this.varifyOrientationChange(), this.config.orientationChangeTimeoutDuration)
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

    public changeGameSize(): void {
        const { width, height } = gameSizeConfig[this.currentGameOrientation];

        this.game.scale.setGameSize(width, height);
        this.game.scale.refresh();
    }

    public setCurrentGameOrientation(orientation: EScreenOrientationWithDevice): void {
        this.orientationStateManager.setCurrentGameOrientation(orientation);
    }

    private setIsOrientationChangeDelayed(isDelayed: boolean): void {
        this._isOrientationChangeDelayed = isDelayed;
    }

    private getResizeHandler(): () => void {
        return this.config.orientationChangeTimeoutDuration > 0 ? this.resizeHandlerWithTimeout.bind(this) : this.varifyOrientationChange;
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

    public get currentWindowOrientation(): EScreenOrientationWithDevice {
        return this.orientationStateManager.currentWindowOrientation;
    }

    public get currentGameOrientation(): EScreenOrientationWithDevice {
        return this.orientationStateManager.currentGameOrientation;
    }

    public get hasBlockers(): boolean {
        return this.orientationChangeBlockersManager.hasBlockers;
    }
}
