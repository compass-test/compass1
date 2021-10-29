// minimally ensure email has format of _@_._
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Matches alphanumeric characters and single hyphens, excluding inputs that begin or end with hyphens
export const githubUsernameRegex = /^[a-zA-Z0-9]+(?:[ -]{1}[a-zA-Z0-9]+)*$/gm;
export const characterLimit = 255;
