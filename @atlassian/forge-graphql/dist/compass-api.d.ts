import { CompassRequests } from "./compass-requests";
import { InternalForgeAPI } from "./types";
export declare type RequiredAPI = {
    asApp: () => InternalForgeAPI;
    asUser: () => InternalForgeAPI;
};
export declare class CompassApi {
    api: RequiredAPI;
    constructor(api?: RequiredAPI);
    asUser(): CompassRequests;
    asApp(): CompassRequests;
}
