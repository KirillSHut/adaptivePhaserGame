import { EOrientationEvents } from "../contracts";

export class OrientationChangeBlockersManager {
    private _blockers: Set<string> = new Set();
    private _delayedOrientationChange: (() => void) | null = null;

    constructor(private scene: Phaser.Scene) {
        this.init();
    }

    private init(): void {
        this.handleAddBlocker();
        this.handleDeleteBlocker();
        this.handleDeleteAllBlocker();
    }

    private handleAddBlocker(): void {
        this.scene.events.on(EOrientationEvents.ADD_ORIENTATION_BLOCKER, (blocker: string) => {
            this._blockers.add(blocker);
        });
    }

    private handleDeleteBlocker(): void {
        this.scene.events.on(EOrientationEvents.DELETE_ORIENTATION_BLOCKER, (blocker: string) => {
            this._blockers.delete(blocker);

            if (this._delayedOrientationChange && this._blockers.size === 0) this._delayedOrientationChange();
        });
    }

    private handleDeleteAllBlocker(): void {
        this.scene.events.on(EOrientationEvents.DELETE_ALL_ORIENTATION_BLOCKERS, () => {
            this._blockers.clear();

            if (this._delayedOrientationChange) this._delayedOrientationChange();
        });
    }

    public clearDelayedOrientationChange(): void {
        this._delayedOrientationChange = null;
    }

    public set delayedOrientationChange(delayedOrientationChange: () => void) {
        this._delayedOrientationChange = delayedOrientationChange;
    }

    public get hasBlockers(): boolean {
        return this._blockers.size === 0 ? false : true;
    }
}