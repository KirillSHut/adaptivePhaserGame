import { IOrientationConfig } from "../contracts/interface/IOrientationConfig";
import { SingletonManager } from "../decorators";
import { OrientationEventManager } from "./OrientationEventsManager";
import { OrientationStateManager } from "./OrientationStateManager";

export class OrientationManager {
    private orientationEventsManager: OrientationEventManager = new OrientationEventManager(this._game, this._config);
    private orientationStateManager: OrientationStateManager = SingletonManager.getInstance(OrientationStateManager);

    constructor(private _game: Phaser.Game, private _config: IOrientationConfig) { }

    public init(): void {
        this.initOrientationStateManager();
        this.initOrientationEventsManager();
    }

    private initOrientationEventsManager(): void {
        const { isOrientationChangeSupported } = this._config;

        if (isOrientationChangeSupported) this.orientationEventsManager.init();
        this.orientationEventsManager.changeGameSize();
    }

    private initOrientationStateManager(): void {
        const { isOrientationChangeSupported, standardOrientation, supportedOrientations } = this._config;

        this.orientationStateManager.setConfig({ isOrientationChangeSupported, standardOrientation, supportedOrientations });
        this.orientationStateManager.init();
    }
}
