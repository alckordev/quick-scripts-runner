/**
 * Supported package managers
 */
export enum PackageManager {
  NPM = 'npm',
  PNPM = 'pnpm',
  YARN = 'yarn',
  BUN = 'bun',
}

/**
 * Information about a package manager
 */
export interface PackageManagerInfo {
  type: PackageManager;
  lockFile: string;
  icon: string;
}

/**
 * Mapping of package managers to their lock files
 */
export const PACKAGE_MANAGER_INFO: Record<PackageManager, PackageManagerInfo> = {
  [PackageManager.NPM]: {
    type: PackageManager.NPM,
    lockFile: 'package-lock.json',
    icon: '📦',
  },
  [PackageManager.PNPM]: {
    type: PackageManager.PNPM,
    lockFile: 'pnpm-lock.yaml',
    icon: '📦',
  },
  [PackageManager.YARN]: {
    type: PackageManager.YARN,
    lockFile: 'yarn.lock',
    icon: '🧶',
  },
  [PackageManager.BUN]: {
    type: PackageManager.BUN,
    lockFile: 'bun.lockb',
    icon: '🥟',
  },
};
