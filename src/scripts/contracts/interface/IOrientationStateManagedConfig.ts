import { IOrientationConfig } from "./IOrientationConfig";

export interface IOrientationStateManagedConfig extends Pick<IOrientationConfig, "defaultOrientation" | "isOrientationChangeSupported" | "supportedOrientations"> { }