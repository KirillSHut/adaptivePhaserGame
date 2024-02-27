import { gameSizeConfig } from "../configs";
import { EOrientationEvents, EScreenOrientationWithDeviceType, IOrientationConfig } from "../contracts";
import { SingletonManager } from "../decorators";
import { OrientationChangeBlockersManager } from "./OrientationChangeBlockersManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationEventManager {
    private orientationChangeBlockersManager: OrientationChangeBlockersManager = new OrientationChangeBlockersManager(this._game);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    private _isOrientationChangeDelayed: boolean = false;
    private _lastOrientationChangeTimeout: number | null = null;

    constructor(private _game: Phaser.Game, private _config: IOrientationConfig) { }

    public init(): void {
        this.orientationChangeBlockersManager.init();
        this.addResizeHandler();
        this.addAllBlockersDeletedHandler();
    }

    private addResizeHandler(): void {
        const resizeHandler = this.getResizeHandler();

        window.addEventListener("resize", () => {
            if (this.currentGameOrientation !== this.currentWindowOrientation) resizeHandler();
        })
    }

    private addAllBlockersDeletedHandler(): void {
        this._game.events.on(EOrientationEvents.ALL_BLOCKERS_DELETED, () => {
            if (!this._isOrientationChangeDelayed) return;

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

    private changeGameOrientation(): void {
        this.setCurrentGameOrientation(this.currentWindowOrientation);

        this.changeGameSize();
        this._game.events.emit(EOrientationEvents.ORIENTATION_CHANGED, this.currentGameOrientation);
    }

    public changeGameSize(): void {
        const { width, height } = gameSizeConfig[this.currentGameOrientation];

        this._game.scale.setGameSize(width, height);
    }

    private resizeHandlerWithTimeout(): void {
        this.clearLastOrientationChangeTimeout();
        // @ts-ignore 
        // setTimeout here returns NodeJS.Timeout type, but in the browser setTimeout must return number
        this._lastOrientationChangeTimeout = setTimeout(() => this.varifyOrientationChange(), this._config.orientationChangeDelay)
    }

    private clearLastOrientationChangeTimeout(): void {
        if (this._lastOrientationChangeTimeout === null) return;

        clearTimeout(this._lastOrientationChangeTimeout);
    }

    private getResizeHandler(): () => void {
        return this._config.orientationChangeDelay > 0 ? this.resizeHandlerWithTimeout.bind(this) : this.varifyOrientationChange.bind(this);
    }

    private setCurrentGameOrientation(orientation: EScreenOrientationWithDeviceType): void {
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

    public get currentWindowOrientation(): EScreenOrientationWithDeviceType {
        return this.orientationStateManager.currentWindowOrientation;
    }

    public get currentGameOrientation(): EScreenOrientationWithDeviceType {
        return this.orientationStateManager.currentGameOrientation;
    }

    public get hasBlockers(): boolean {
        return this.orientationChangeBlockersManager.hasBlockers;
    }
}