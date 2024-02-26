import { IOrientationConfig } from "./IOrientationConfig";

export interface IOrientationStateManagedConfig extends Pick<IOrientationConfig, "standardOrientation" | "isOrientationChangeSupported" | "supportedOrientations"> { }