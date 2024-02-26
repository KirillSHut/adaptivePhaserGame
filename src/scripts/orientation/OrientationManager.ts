import { IOrientationConfig } from "../contracts/interface/IOrientationConfig";
import { SingletonManager } from "../decorators";
import { OrientationEventManager } from "./OrientationEventsManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationManager {
    private orientationEventsManager: OrientationEventManager = new OrientationEventManager(this.game, this.config);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    constructor(private game: Phaser.Game, private config: IOrientationConfig) { }

    public init(): void {
        const { isOrientationChangeSupported } = this.config;

        if (isOrientationChangeSupported) this.orientationEventsManager.init();

        this.initOrientationStateManager();
        this.orientationEventsManager.changeGameSize();
    }

    private initOrientationStateManager(): void {
        const { isOrientationChangeSupported, standardOrientation, supportedOrientations } = this.config;

        this.orientationStateManager.setConfig({ isOrientationChangeSupported, standardOrientation, supportedOrientations });
        this.orientationStateManager.init();
    }
}
