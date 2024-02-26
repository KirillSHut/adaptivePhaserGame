import { EScreenOrientation } from "../enums";
import { ISupportedDevices } from "./ISupportedDevices";

export interface ISupportedOrientations extends Partial<Record<EScreenOrientation, ISupportedDevices>> { }