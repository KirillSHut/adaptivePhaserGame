import { gameSizeConfig } from "../configs";
import { EOrientationEvents, EScreenOrientations } from "../contracts";
import { SingletonManager } from "../decorators";
import { OrientationChangeBlockersManager } from "./OrientationChangeBlockersManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationManager {
    private orientationChangeBlockersManager: OrientationChangeBlockersManager = SingletonManager.getInstance(OrientationChangeBlockersManager, this.game);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    private _isOrientationChangeDelayed: boolean = false;
    private _lastEndOrientationChange: ((emitEvent: boolean) => void) | void;
    private _timeOutTimeConfig: number = 500;
    private _timeout: NodeJS.Timeout | null = null;

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
                if (this._lastEndOrientationChange) {
                    this._lastEndOrientationChange(false);
                }
                this._lastEndOrientationChange = this.endOrientationChange;

                this._timeout = setTimeout(() => this.varifyOrientationChange(), this._timeOutTimeConfig)
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
                console.log("No blockers orientation changed");

                this._lastEndOrientationChange!(true);
                this.setIsOrientationChangeDelayed(false);
                break

            case (this.areBlockersAndOrientationChanged):
                console.log("BLOCKERSSS");


                this.setIsOrientationChangeDelayed(true);
                break

            case (this.orientationHasNotChanged):
                console.log("Orientation hasn`t changed");

                this.setIsOrientationChangeDelayed(false);
                break
        }
    }

    private get isOrientationChangeDelayed(): boolean {
        return this._isOrientationChangeDelayed;
    }

    private setIsOrientationChangeDelayed(isDelayed: boolean): void {
        this._isOrientationChangeDelayed = isDelayed;
    }

    // private varifyOrientationChange(): void {
    //     switch (true) {
    //         case (this.areNoBlockersAndOrientationChanged):
    //             this._lastEndOrientationChange!(true);
    //             this.clearDelayedOrientationChangeCall();
    //             break

    //         case (this.areBlockersAndOrientationChanged):
    //             this.setDelayedOrientationChange();
    //             break

    //         case (this.orientationHasNotChanged):
    //             this.clearDelayedOrientationChangeCall();
    //             break
    //     }
    // }

    // private clearDelayedOrientationChangeCall(): void {
    //     this.orientationChangeBlockersManager.clearDelayedOrientationChange();
    // }

    // private setDelayedOrientationChange(): void {
    //     this.orientationChangeBlockersManager.delayedOrientationChange = this.varifyOrientationChange.bind(this);
    // }

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
            this.setCurrentGameOrientation(this.currentWindowOrientation);

            this.changeGameOrientation();
            this.game.events.emit(EOrientationEvents.ORIENTATION_CHANGED, this.currentGameOrientation);
        }
    }

    // @note temprary solution
    public changeGameOrientation(): void {
        const { width, height } = gameSizeConfig[this.currentGameOrientation];

        this.game.scale.setGameSize(width, height);
        this.game.scale.refresh();
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
