import { EScreenOrientationWithDeviceType } from "../enums";
import { ISupportedOrientations } from "./ISupportedOrientations";

export interface IOrientationConfig {
    orientationChangeTimeoutDuration: number;
    isOrientationChangeSupported: boolean,
    standardOrientation: EScreenOrientationWithDeviceType,
    supportedOrientations?: ISupportedOrientations
}