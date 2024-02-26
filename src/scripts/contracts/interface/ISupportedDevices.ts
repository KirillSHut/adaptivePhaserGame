import { EScreenOrientationWithDeviceType } from "../enums";

export interface ISupportedDevices {
    default: EScreenOrientationWithDeviceType,
    [key: string]: EScreenOrientationWithDeviceType
}