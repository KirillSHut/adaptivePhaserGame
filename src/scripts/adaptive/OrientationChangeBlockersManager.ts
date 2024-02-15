import { EOrientationEvents } from "../contracts";

export class OrientationChangeBlockersManager {
    private _blockers: Set<string> = new Set();
    private _alreadyUsedScenes: Set<string> = new Set();
    private _delayedOrientationChange: (() => void) | null = null;

    constructor(private scene: Phaser.Scene) {
        this.init();
    }

    private init(): void {
        this.addSceneToAlreadyUsed();
        this.addBlockersHandlers();
    }

    private addBlockersHandlers(): void {
        this.handleAddBlocker();
        this.handleDeleteBlocker();
        this.handleDeleteAllBlocker();
    }

    public setScene(scene: Phaser.Scene): void {
        const sceneKey = scene.sys.settings.key;

        this.scene = scene;
        if (this._alreadyUsedScenes.has(sceneKey)) return

        this.addBlockersHandlers();
        this.addSceneToAlreadyUsed();
    }

    private addSceneToAlreadyUsed(): void {
        const sceneKey = this.scene.sys.settings.key;

        this._alreadyUsedScenes.add(sceneKey);
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