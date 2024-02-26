import { spinButtonConfig } from "../configs";
import { EOrientationEvents, EScreenOrientationWithDeviceType, ESpinEvents } from "../contracts";

export class SpinButton extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        this.init();
    }

    public init(): void {
        this.scene.add.existing(this);
        this.activate();
        this.addOrientationChangeHandler();
        this.addPointerDownHandler();
        this.addSpinStopHandler();
    }

    public addPointerDownHandler(): void {
        this.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.deactivate();

            this.scene.events.emit(ESpinEvents.START_SPIN);
            this.scene.game.events.emit(EOrientationEvents.ADD_ORIENTATION_BLOCKER, "spinAnimationPlaying");
        })
    }

    public addSpinStopHandler(): void {
        this.scene.events.on(ESpinEvents.STOP_SPIN, () => {
            this.activate();

            this.scene.game.events.emit(EOrientationEvents.DELETE_ORIENTATION_BLOCKER, "spinAnimationPlaying");
        })
    }

    public addOrientationChangeHandler(): void {
        this.scene.game.events.on(EOrientationEvents.ORIENTATION_CHANGED, (currentGameOrientation: EScreenOrientationWithDeviceType) => {
            const { x, y } = spinButtonConfig[currentGameOrientation];

            this.setPosition(x, y);
        })
    }

    public activate(): void {
        this.setInteractive({ cursor: "pointer" });
        this.setFrame("spinDefault");
    }

    public deactivate(): void {
        this.removeInteractive();
        this.setFrame("spinDisabled");
    }
}