import { EOrientationEvents } from "../contracts";

export class OrientationChangeBlockersManager {
    private _blockers: Set<string> = new Set();
    // private _delayedOrientationChange: (() => void) | null = null;

    constructor(private game: Phaser.Game) { }

    public init(): void {
        this.addBlockersHandlers();
    }

    private addBlockersHandlers(): void {
        this.addBlockerAddHandler();
        this.addBlockerDeleteHandler();
        this.addBlockerDeleteAllHandler();
    }

    private addBlockerAddHandler(): void {
        this.game.events.on(EOrientationEvents.ADD_ORIENTATION_BLOCKER, (blocker: string) => {
            this._blockers.add(blocker);
        });
    }

    private addBlockerDeleteHandler(): void {
        this.game.events.on(EOrientationEvents.DELETE_ORIENTATION_BLOCKER, (blocker: string) => {
            this._blockers.delete(blocker);

            if (this._blockers.size === 0) this.emitAllBlockersDeleted();
            // old
            // if (this._delayedOrientationChange && this._blockers.size === 0) this._delayedOrientationChange();
        });
    }

    private addBlockerDeleteAllHandler(): void {
        this.game.events.on(EOrientationEvents.DELETE_ALL_ORIENTATION_BLOCKERS, () => {
            this._blockers.clear();

            this.emitAllBlockersDeleted();
            // old
            // if (this._delayedOrientationChange) this._delayedOrientationChange();
        });
    }

    private emitAllBlockersDeleted(): void {
        this.game.events.emit(EOrientationEvents.ALL_BLOCKERS_DELETED);
    }

    // public clearDelayedOrientationChange(): void {
    //     this._delayedOrientationChange = null;
    // }

    // @note change this code to another solution
    // public set delayedOrientationChange(delayedOrientationChange: () => void) {
    //     this._delayedOrientationChange = delayedOrientationChange;
    // }

    public get hasBlockers(): boolean {
        return this._blockers.size === 0 ? false : true;
    }
}