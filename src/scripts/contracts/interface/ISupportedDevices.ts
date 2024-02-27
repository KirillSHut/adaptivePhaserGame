import { EDevices, EScreenOrientationWithDeviceType } from "../enums";

export interface ISupportedDevices extends Partial<Record<EDevices, EScreenOrientationWithDeviceType>> {
    [EDevices.DEFAULT]: EScreenOrientationWithDeviceType,
}