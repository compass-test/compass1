import { moduleResolveMapBuilder } from '../module-resolve-map-builder';

async function main() {
  console.log(JSON.stringify(await moduleResolveMapBuilder()));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
