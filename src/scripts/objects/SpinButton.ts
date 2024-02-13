import { spinButtonConfig } from "../configs";
import { EGameSceneEvents, ESpinEvents } from "../contracts";
import { OrientationUtil } from "../utils";

export class SpinButton extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        this.init();
    }

    public init(): void {
        this.scene.add.existing(this);
        this.activate();
        this.handleChangeOrientation();
        this.handlePointerDown();
        this.hangleSpinStop();
    }

    public handlePointerDown(): void {
        this.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.deactivate();
            this.scene.events.emit(ESpinEvents.START_SPIN);
        })
    }

    public hangleSpinStop(): void {
        this.scene.events.on(ESpinEvents.STOP_SPIN, () => {
            this.activate();
        })
    }

    public handleChangeOrientation(): void {
        this.scene.events.on(EGameSceneEvents.GAME_SCENE_ORIENTATION_CHANGE, () => {
            const currentOrientation = OrientationUtil.get();
            const { x, y } = spinButtonConfig[currentOrientation];

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