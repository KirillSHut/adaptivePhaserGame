import { OrientationStateManager } from "../adaptive";
import { logoConfig } from "../configs";
import { EOrientationEvents, ESpinEvents } from "../contracts";
import { SingletonManager } from "../manager";

export class Logo extends Phaser.GameObjects.Sprite {
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'phaser-logo');

        this.init();
    }

    public init(): void {
        this.scene.add.existing(this);
        this.handleChangeOrientation();
        this.handleStartSpin();
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

    public handleStartSpin(): void {
        this.scene.events.on(ESpinEvents.START_SPIN, () => this.startTween());
    }

    public handleChangeOrientation(): void {
        this.scene.events.on(EOrientationEvents.ORIENTATION_CHANGED, () => {
            const currentOrientation = this.orientationStateManager.currentGameOrientation;
            const { x, y } = logoConfig[currentOrientation];

            this.setPosition(x, y);
        })
    }
}
