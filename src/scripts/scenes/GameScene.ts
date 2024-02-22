import { Logo, SpinButton } from '../components';
import { OrientationStateManager } from '../orientation';
import { logoConfig, gameSceneTextConfig, spinButtonConfig } from '../configs';
import { EOrientationEvents, EScreenOrientations } from '../contracts';
import { SingletonManager } from '../decorators';

export class GameScene extends Phaser.Scene {
    public orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    public logo: Logo;
    public spinButton: SpinButton;
    public orientationText: Phaser.GameObjects.Text;

    constructor() {
        super({ key: 'GameScene' })
    }

    create() {
        this.createPhaserLogo();
        this.createSpinButton();
        this.createOrientationText();

        this.addOrientationTextOrientationChangeHandler();
    }

    private createOrientationText(): void {
        const textConfig = gameSceneTextConfig[this.currentGameOrientation];

        this.orientationText = this.add.text(30, 15, textConfig.text).setOrigin(0, 0);;
        this.orientationText.setStyle(textConfig.styles);
    }

    private addOrientationTextOrientationChangeHandler(): void {
        this.game.events.on(EOrientationEvents.ORIENTATION_CHANGED, (currentGameOrientation: EScreenOrientations) => {
            const { text } = gameSceneTextConfig[currentGameOrientation];

            this.orientationText.setText(text);
        })
    }

    private createPhaserLogo(): void {
        const { x, y } = logoConfig[this.currentGameOrientation];

        this.logo = new Logo(this, x, y);
    }

    private createSpinButton(): void {
        const { x, y } = spinButtonConfig[this.currentGameOrientation];

        this.spinButton = new SpinButton(this, x, y, "interface", "spinDefault");
    }

    public get currentGameOrientation(): EScreenOrientations {
        return this.orientationStateManager.currentGameOrientation;
    }
} 
