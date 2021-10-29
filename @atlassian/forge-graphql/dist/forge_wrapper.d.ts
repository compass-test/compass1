import { APIResponse, InternalForgeAPI } from "./types";
export default class ForgeWrapper {
    static wrap(api: InternalForgeAPI): any;
    private api;
    constructor(api: InternalForgeAPI);
    requestGraph<R, V>(query: string, variables?: V): Promise<APIResponse<R>>;
}
