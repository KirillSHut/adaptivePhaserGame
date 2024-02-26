import { EScreenOrientationWithDevice } from "../enums";

export interface ISupportedDevices {
    default: EScreenOrientationWithDevice,
    [key: string]: EScreenOrientationWithDevice
}