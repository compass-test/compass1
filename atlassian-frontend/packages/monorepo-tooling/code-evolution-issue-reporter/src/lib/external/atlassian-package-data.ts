import pkgUp from 'pkg-up';
import { loadFileAsJson } from '../util/io';

interface PackageJson {
  atlassian?: {
    team: string;
  };
  jira?: {
    team: string;
  };
  name: string;
  team: string;
}

interface TeamsJson {
  [team: string]: {
    'directly-responsible-individual': string;
  };
}

export class DefaultAtlassianPackageData {
  private teamsJson?: Promise<TeamsJson>;
  private packageData: Map<string, Promise<PackageJson>> = new Map();
  private packagePaths: Map<string, string> = new Map();

  constructor(private teamsPath: string) {}

  private getTeamsJson() {
    if (!this.teamsJson) {
      this.teamsJson = loadFileAsJson<TeamsJson>(this.teamsPath);
    }
    return this.teamsJson;
  }

  private getPackageJson(packagePath: string) {
    if (!this.packageData.has(packagePath)) {
      this.packageData.set(
        packagePath,
        loadFileAsJson<PackageJson>(packagePath),
      );
    }
    return this.packageData.get(packagePath);
  }

  private async getPackagePathForFilePath(filePath: string) {
    if (!this.packagePaths.has(filePath)) {
      const packagePath = await pkgUp({ cwd: filePath });

      if (!packagePath) {
        throw new Error(`No package path found for file ${filePath}`);
      }

      this.packagePaths.set(filePath, packagePath);
      return packagePath;
    }

    return this.packagePaths.get(filePath);
  }

  public async getAssigneeForPath(filePath: string) {
    const packagePath = await this.getPackagePathForFilePath(filePath);
    if (!packagePath) {
      return;
    }

    const teamsJson = await this.getTeamsJson();
    const packageData = await this.getPackageJson(packagePath);
    const teamName = packageData?.atlassian?.team || packageData?.jira?.team;

    const assignee = teamName
      ? teamsJson![teamName]['directly-responsible-individual']
      : '';

    return assignee;
  }

  public async getPackageDataForPath(filePath: string) {
    const packagePath = await this.getPackagePathForFilePath(filePath);
    if (!packagePath) {
      return;
    }
    const packageData = await this.getPackageJson(packagePath);
    const team = packageData?.atlassian?.team || packageData?.jira?.team;
    const name = packageData ? packageData.name : '';

    return {
      name,
      team,
    };
  }
}
