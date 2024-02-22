import { OrientationStateManager } from "../orientation";
import { preloadSpineConfig } from "../configs";
import { EOrientationEvents, EScreenOrientations } from "../contracts";
import { SingletonManager } from "../decorators";

export class PreloadScene extends Phaser.Scene {
    public orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);
    public linkToGameScene: Phaser.GameObjects.Text;
    public spine: any;

    constructor() {
        super({ key: 'PreloadScene' })
    }

    preload() {
        this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
        this.load.atlas("interface", 'assets/sprites/interface.png', 'assets/sprites/interface.json');

        // @ts-ignore
        this.load.spine("bat", 'assets/spines/bat/bat.json', 'assets/spines/bat/bat.atlas');
    }

    create() {
        this.createLinkToGameScene();
        this.createSpine();

        this.addSpineOrientationChangeHandler();
        this.addGameSceneLinkPointerDownHandler();
    }

    private createSpine(): void {
        const { x, y } = preloadSpineConfig[this.currentGameOrientation];
        // @ts-ignore
        this.spine = this.add.spine(x, y, "bat", "flying", true);
    }

    private createLinkToGameScene(): void {
        this.linkToGameScene = this.add.text(30, 30, "Go to GameScene", {
            color: '#000000',
            fontSize: '60px'
        });
        this.linkToGameScene.setInteractive({ cursor: "pointer" });
    }

    private addSpineOrientationChangeHandler(): void {
        this.game.events.on(EOrientationEvents.ORIENTATION_CHANGED, (currentGameOrientation: EScreenOrientations) => {
            const { x, y } = preloadSpineConfig[currentGameOrientation];

            this.spine.setPosition(x, y);
        })
    }

    private addGameSceneLinkPointerDownHandler(): void {
        this.linkToGameScene.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.scene.start('GameScene');
        })
    }

    private get currentGameOrientation(): EScreenOrientations {
        return this.orientationStateManager.currentGameOrientation;
    }
} 