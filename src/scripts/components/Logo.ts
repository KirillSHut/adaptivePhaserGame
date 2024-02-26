import { logoConfig } from "../configs";
import { EOrientationEvents, EScreenOrientationWithDeviceType, ESpinEvents } from "../contracts";

export class Logo extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'phaser-logo');

        this.init();
    }

    public init(): void {
        this.scene.add.existing(this);
        this.addOrientationChangeHandler();
        this.addStartSpinHandler();
    }

    public startTween(): void {
        this.scene.add.tween({
            targets: this,
            alpha: 0,
            x: this.x + 150,
            duration: 500,
            onComplete: () => this.secondTween()
        })
    }

    private secondTween(): void {
        this.scene.add.tween({
            targets: this,
            alpha: 1,
            x: this.x - 150,
            duration: 500,
            onComplete: () => this.thirdTween()
        })
    }

    private thirdTween(): void {
        this.scene.add.tween({
            targets: this,
            alpha: 0,
            x: this.x - 150,
            duration: 500,
            onComplete: () => this.endTween()
        })
    }

    private endTween(): void {
        this.scene.add.tween({
            targets: this,
            alpha: 1,
            x: this.x + 150,
            duration: 500,
            onComplete: () => this.emitFinishSpinTween()
        })
    }

    private emitFinishSpinTween(): void {
        this.scene.events.emit(ESpinEvents.STOP_SPIN);
    }

    public addStartSpinHandler(): void {
        this.scene.events.on(ESpinEvents.START_SPIN, () => this.startTween());
    }

    public addOrientationChangeHandler(): void {
        this.scene.game.events.on(EOrientationEvents.ORIENTATION_CHANGED, (currentGameOrientation: EScreenOrientationWithDeviceType) => {
            const { x, y } = logoConfig[currentGameOrientation];

            this.setPosition(x, y);
        })
    }
}
