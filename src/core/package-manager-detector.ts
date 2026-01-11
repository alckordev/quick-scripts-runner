import * as path from 'path';
import * as fs from 'fs';
import { PackageManager } from '../models/package-manager';
import { IConfigurationService } from '../services/configuration-service';
import { Logger } from '../utils/logger';

/**
 * Interface for package manager detector
 */
export interface IPackageManagerDetector {
  detect(workspacePath: string): PackageManager;
}

/**
 * Implementation of package manager detector
 */
export class PackageManagerDetector implements IPackageManagerDetector {
  constructor(private readonly configService: IConfigurationService) {}

  /**
   * Detects package manager based on lock files
   */
  detect(workspacePath: string): PackageManager {
    if (!this.configService.shouldAutoDetect()) {
      const defaultPM = this.configService.getDefaultPackageManager();
      Logger.debug(`Auto-detection disabled, using: ${defaultPM}`);
      return defaultPM;
    }

    const lockFiles = [
      { file: 'pnpm-lock.yaml', manager: PackageManager.PNPM },
      { file: 'yarn.lock', manager: PackageManager.YARN },
      { file: 'bun.lockb', manager: PackageManager.BUN },
      { file: 'package-lock.json', manager: PackageManager.NPM },
    ];

    for (const { file, manager } of lockFiles) {
      const lockFilePath = path.join(workspacePath, file);
      if (fs.existsSync(lockFilePath)) {
        Logger.info(`Package manager detected: ${manager} (${file})`);
        return manager;
      }
    }

    const defaultPM = this.configService.getDefaultPackageManager();
    Logger.info(`No lock file found, using default: ${defaultPM}`);
    return defaultPM;
  }
}
