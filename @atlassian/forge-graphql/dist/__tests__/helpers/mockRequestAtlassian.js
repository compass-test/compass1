global.api = {
    asApp: () => ({
        __requestAtlassian: () => ({ json: () => 'hello world' }),
    }),
    asUser: () => ({
        __requestAtlassian: () => console.log("asUser.__requestAtlassian called"),
    }),
};
//# sourceMappingURL=mockRequestAtlassian.js.map