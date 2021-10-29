import { tokensPackageName } from '../constants';

export default function doesPackageUseTokens(pkgJSON: any) {
  return !!(
    process.env.ENABLE_TOKENS === 'true' ||
    (pkgJSON.dependencies && tokensPackageName in pkgJSON.dependencies) ||
    (pkgJSON.devDependencies && tokensPackageName in pkgJSON.devDependencies) ||
    (pkgJSON.peerDependencies && tokensPackageName in pkgJSON.peerDependencies)
  );
}
