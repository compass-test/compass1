# Jest config

All jest-related configuration housed inside a single package so we can easily track dependencies for caching and changed package detection.

All package dependencies must be listed in package.json to ensure external dependency changes trigger change detection.
