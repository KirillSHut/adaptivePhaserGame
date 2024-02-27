import { IOrientationConfig } from "./IOrientationConfig";

export interface IOrientationStateManagerConfig extends Pick<IOrientationConfig, "standardOrientation" | "isOrientationChangeSupported" | "supportedOrientations"> { }