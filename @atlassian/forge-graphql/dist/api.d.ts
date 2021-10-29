import { CompassApi } from './compass-api';
import { InternalForgeAPI } from "./types";
export declare type RequiredAPI = {
    asApp: () => InternalForgeAPI;
    asUser: () => InternalForgeAPI;
};
export declare class Api {
    api: RequiredAPI;
    compass: CompassApi;
    constructor(api?: RequiredAPI);
}
