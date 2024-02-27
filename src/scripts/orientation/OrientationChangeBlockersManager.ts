import { EOrientationEvents } from "../contracts";

export class OrientationChangeBlockersManager {
    private _blockers: Set<string> = new Set();

    constructor(private _game: Phaser.Game) { }

    public init(): void {
        this.addBlockersHandlers();
    }

    private addBlockersHandlers(): void {
        this.addBlockerAddHandler();
        this.addBlockerDeleteHandler();
        this.addBlockerDeleteAllHandler();
    }

    private addBlockerAddHandler(): void {
        this._game.events.on(EOrientationEvents.ADD_ORIENTATION_BLOCKER, (blocker: string) => {
            this._blockers.add(blocker);
        });
    }

    private addBlockerDeleteHandler(): void {
        this._game.events.on(EOrientationEvents.DELETE_ORIENTATION_BLOCKER, (blocker: string) => {
            this._blockers.delete(blocker);

            if (this._blockers.size === 0) this.emitAllBlockersDeleted();
        });
    }

    private addBlockerDeleteAllHandler(): void {
        this._game.events.on(EOrientationEvents.DELETE_ALL_ORIENTATION_BLOCKERS, () => {
            this._blockers.clear();

            this.emitAllBlockersDeleted();
        });
    }

    private emitAllBlockersDeleted(): void {
        this._game.events.emit(EOrientationEvents.ALL_BLOCKERS_DELETED);
    }

    public get hasBlockers(): boolean {
        return this._blockers.size === 0 ? false : true;
    }
}