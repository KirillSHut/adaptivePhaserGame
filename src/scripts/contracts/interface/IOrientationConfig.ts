import { EScreenOrientationWithDevice } from "../enums";
import { ISupportedOrientations } from "./ISupportedOrientations";

export interface IOrientationConfig {
    orientationChangeTimeoutDuration: number;
    defaultOrientation: EScreenOrientationWithDevice,
    isOrientationChangeSupported: boolean,
    supportedOrientations: ISupportedOrientations
}