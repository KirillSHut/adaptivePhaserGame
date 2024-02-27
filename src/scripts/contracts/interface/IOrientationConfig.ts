import { EScreenOrientationWithDeviceType } from "../enums";
import { ISupportedOrientations } from "./ISupportedOrientations";

export interface IOrientationConfig {
    orientationChangeDelay: number;
    isOrientationChangeSupported: boolean,
    standardOrientation: EScreenOrientationWithDeviceType,
    supportedOrientations?: ISupportedOrientations
}