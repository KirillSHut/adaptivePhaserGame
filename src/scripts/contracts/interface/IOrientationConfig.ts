import { EScreenOrientationWithDevice } from "../enums";
import { ISupportedOrientations } from "./ISupportedOrientations";

export interface IOrientationConfig {
    orientationChangeTimeoutDuration: number;
    isOrientationChangeSupported: boolean,
    standardOrientation: EScreenOrientationWithDevice,
    supportedOrientations?: ISupportedOrientations
}