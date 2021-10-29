import minimatch from 'minimatch';

import { PackageInfo, NO_TEAM } from '../types';
import { Logger } from './Logger';

export class Packages {
  private packages: PackageInfo[];

  constructor(packages: PackageInfo[]) {
    this.packages = packages;
  }

  get() {
    return this.packages;
  }

  /** Filter the list of packages by names */
  filterByNames(names: string[]) {
    Logger.log('Filtering packages by names:', names);
    // reduce is used instead of filter to log incorrect package names
    this.packages = names.reduce((pkgs: PackageInfo[], name) => {
      const findPkg = this.packages.find(pkg => pkg.name === name);
      if (findPkg) {
        return [...pkgs, findPkg];
      }
      Logger.addError(`${name} could not be found`);
      return pkgs;
    }, []);
  }

  /** Filter list of packages by team that owns them */
  filterByTeam(team: string) {
    Logger.log('Filtering packages by team:', team);
    if (team === NO_TEAM) {
      this.packages = this.packages.filter(
        pkg => !pkg.config.atlassian || !pkg.config.atlassian.team,
      );
    } else {
      this.packages = this.packages.filter(
        pkg => pkg.config.atlassian && pkg.config.atlassian.team === team,
      );
      if (this.packages.length === 0) {
        Logger.addError(
          `${team} could not be found.\n` +
            'Bolt does not interpret command line args with spaces correctly.\n' +
            'Please set --team either with \'"Team Name"\' or "Team-Name".',
        );
      }
    }
  }

  /** Apply include and exclude filters to list of packages */
  filterByMatch(include?: string, exclude?: string) {
    Logger.log(
      `Applying filters to packages: include '${include}' and exclude '${exclude}'`,
    );
    this.packages = this.packages.filter(
      pkg =>
        (include
          ? pkg.name.includes(include) || minimatch(pkg.dir, include)
          : true) &&
        (exclude
          ? !pkg.name.includes(exclude) && !minimatch(pkg.dir, exclude)
          : true),
    );
  }
}
