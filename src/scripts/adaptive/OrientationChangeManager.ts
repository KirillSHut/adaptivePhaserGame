import { EOrientationEvents, EScreenOrientations } from "../contracts";
import { OrientationUtil } from "../utils/OrientationUtil";
import { OrientationChangeBlockersManager } from "./OrientationChangeBlockersManager";

export class OrientationChangeManager {
    private orientationChangeBlockersManager: OrientationChangeBlockersManager = new OrientationChangeBlockersManager(this.scene);
    private stateManager
    private _lastOrientation: EScreenOrientations;
    private _lastEndOrientationChange: ((emitEvent: boolean) => void) | void;
    private _timeOutTimeConfig: number = 500;
    private _timeout: any;

    constructor(private scene: Phaser.Scene) {
        this.init();
    }

    private init(): void {
        this.defineCurrentOrientation();
        this.handleResize();
    }

    private handleResize(): void {

        window.addEventListener("resize", () => {
            if (this.lastOrientation !== this.currentOrientation) {
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
            case (!this.hasBlockers && (this.lastOrientation !== this.currentOrientation)):

                console.log("No blocker");

                this._lastEndOrientationChange!(true);
                this.orientationChangeBlockersManager.clearDelayedOrientationChange();

                break
            case (this.hasBlockers && (this.lastOrientation !== this.currentOrientation)):

                console.log("Blockerrrr");

                this.orientationChangeBlockersManager.delayedOrientationChange = this.varifyOrientationChange.bind(this);

                break
            case (this.lastOrientation === this.currentOrientation):

                console.log("The same orientation");

                this.orientationChangeBlockersManager.clearDelayedOrientationChange();

                break
        }
    }

    private endOrientationChange(emitEvent: boolean): void {
        clearTimeout(this._timeout);

        this._timeout = null;
        if (emitEvent) {
            const currentOrientation = OrientationUtil.get();

            this.setLastOrientation(currentOrientation);
            this.scene.events.emit(EOrientationEvents.ORIENTATION_CHANGED);
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

    public get hasBlockers(): boolean {
        return this.orientationChangeBlockersManager.hasBlockers;
    }
}











// import { EOrientationEvents, EScreenOrientations } from "../contracts";
// import { OrientationUtil } from "../utils/OrientationUtil";

// export class OrientationChangeManager {
//     private _lastOrientation: EScreenOrientations;
//     private _lastEndOrientationChange: ((emitEvent: boolean) => void) | void;
//     private _timeOutTimeConfig: number = 500;
//     private _doesOrientationChangeDelayed: boolean = false;
//     private _timeout: any;
//     private _blockers: Set<string> = new Set();

//     constructor(private scene: Phaser.Scene) {
//         this.init();
//     }

//     private init(): void {
//         this.defineCurrentOrientation();
//         this.handleResize();
//         // this.handleBlockerEvents();
//         this.handleAddBlocker();
//         this.handleDeleteBlocker();
//         this.handleDeleteAllBlocker();

//         console.log(this._blockers.size);
//     }

//     // BLOCKER

//     private handleBlockerEvents(): void {
//         this.handleAddBlocker();
//         this.handleDeleteBlocker();
//         this.handleDeleteAllBlocker();
//     }

//     private handleAddBlocker(): void {
//         this.scene.events.on(EOrientationEvents.ADD_ORIENTATION_BLOCKER, (blocker: string) => {
//             this._blockers.add(blocker);
//         });
//     }

//     private handleDeleteBlocker(): void {
//         this.scene.events.on(EOrientationEvents.DELETE_ORIENTATION_BLOCKER, (blocker: string) => {
//             this._blockers.delete(blocker);

//             if (this._doesOrientationChangeDelayed) this.varifyOrientationChange()
//         });
//     }

//     private handleDeleteAllBlocker(): void {
//         this.scene.events.on(EOrientationEvents.DELETE_ALL_ORIENTATION_BLOCKERS, () => {
//             this._blockers.clear();
//             if (this._doesOrientationChangeDelayed) this.varifyOrientationChange()
//         });
//     }

//     private get areNoBlockers(): boolean {
//         return this._blockers.size === 0 ? true : false;
//     }

//     // BLOCKER

//     private handleResize(): void {

//         window.addEventListener("resize", () => {
//             if (this.lastOrientation !== this.currentOrientation) {
//                 if (this._lastEndOrientationChange) {
//                     this._lastEndOrientationChange(false);
//                 }
//                 this._lastEndOrientationChange = this.endOrientationChange;

//                 this._timeout = setTimeout(() => this.varifyOrientationChange(), this._timeOutTimeConfig)
//             }
//         })
//     }

//     private varifyOrientationChange(): void {
//         switch (true) {
//             case (!this.areNoBlockers && (this.lastOrientation !== this.currentOrientation)):
//                 console.log("No blocker");
//                 this._lastEndOrientationChange!(true);
//                 this._doesOrientationChangeDelayed = false;
//                 break
//             case (this.areNoBlockers && (this.lastOrientation !== this.currentOrientation)):
//                 console.log("Blockerrrr");

//                 this._doesOrientationChangeDelayed = true;
//                 break
//             case (this.lastOrientation === this.currentOrientation):
//                 console.log("The same orientation");
//                 this._doesOrientationChangeDelayed = false;
//                 break
//         }
//     }

//     private endOrientationChange(emitEvent: boolean): void {
//         clearTimeout(this._timeout);

//         this._timeout = null;
//         if (emitEvent) {
//             const currentOrientation = OrientationUtil.get();

//             this.setLastOrientation(currentOrientation);
//             this.scene.events.emit(EOrientationEvents.ORIENTATION_CHANGED);
//         }
//     }

//     private defineCurrentOrientation(): void {
//         const currentOrientation = OrientationUtil.get();

//         this.setLastOrientation(currentOrientation);
//     }

//     public setLastOrientation(lastOrientation: EScreenOrientations): void {
//         this._lastOrientation = lastOrientation;
//     }

//     public get currentOrientation(): EScreenOrientations {
//         return OrientationUtil.get();
//     }

//     public get lastOrientation(): EScreenOrientations {
//         return this._lastOrientation;
//     }
// }