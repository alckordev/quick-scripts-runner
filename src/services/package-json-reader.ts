import * as path from 'path';
import * as fs from 'fs';
import { Script } from '../models/script';
import { Logger } from '../utils/logger';

/**
 * Interface for package.json reader
 */
export interface IPackageJsonReader {
  readScripts(workspacePath: string): Promise<Script[]>;
  exists(workspacePath: string): boolean;
}

/**
 * Implementation of package.json reader
 */
export class PackageJsonReader implements IPackageJsonReader {
  /**
   * Checks if package.json exists in the workspace
   */
  exists(workspacePath: string): boolean {
    const packageJsonPath = path.join(workspacePath, 'package.json');
    return fs.existsSync(packageJsonPath);
  }

  /**
   * Reads and parses scripts from package.json
   */
  async readScripts(workspacePath: string): Promise<Script[]> {
    try {
      const packageJsonPath = path.join(workspacePath, 'package.json');

      if (!this.exists(workspacePath)) {
        Logger.debug(`package.json not found in: ${workspacePath}`);
        return [];
      }

      const content = await fs.promises.readFile(packageJsonPath, 'utf-8');
      const packageJson = JSON.parse(content);

      if (!packageJson.scripts || typeof packageJson.scripts !== 'object') {
        Logger.debug('No scripts found in package.json');
        return [];
      }

      const scripts: Script[] = Object.entries(packageJson.scripts)
        .filter(([, command]) => typeof command === 'string')
        .map(([name, command]) => ({
          name,
          command: command as string,
        }));

      Logger.info(`Found ${scripts.length} scripts`);
      return scripts;
    } catch (error) {
      Logger.error('Error reading package.json', error as Error);
      return [];
    }
  }
}
