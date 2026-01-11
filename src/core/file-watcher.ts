import * as vscode from 'vscode';
import { ScriptsProvider } from './scripts-provider';
import { IStatusBarService } from '../services/status-bar-service';
import { IPackageManagerDetector } from './package-manager-detector';
import { Logger } from '../utils/logger';

/**
 * Watches for changes in relevant files and updates the view
 */
export class FileWatcher {
  private fileWatcher: vscode.FileSystemWatcher | undefined;
  private disposables: vscode.Disposable[] = [];

  constructor(
    private readonly scriptsProvider: ScriptsProvider,
    private readonly statusBarService: IStatusBarService,
    private readonly packageManagerDetector: IPackageManagerDetector
  ) {}

  /**
   * Initializes the file watcher
   */
  start(): void {
    const pattern = new vscode.RelativePattern(
      vscode.workspace.workspaceFolders?.[0] || '',
      '**/{package.json,*lock.yaml,*.lock,*.lockb}'
    );

    this.fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);

    this.fileWatcher.onDidChange(() => this.handleFileChange());
    this.fileWatcher.onDidCreate(() => this.handleFileChange());
    this.fileWatcher.onDidDelete(() => this.handleFileChange());

    this.disposables.push(this.fileWatcher);

    Logger.info('File watcher started');
  }

  /**
   * Handles changes in watched files
   */
  private handleFileChange(): void {
    Logger.debug('Relevant file modified, refreshing...');
    this.scriptsProvider.refresh();

    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (workspaceFolder) {
      const packageManager = this.packageManagerDetector.detect(workspaceFolder.uri.fsPath);
      this.statusBarService.update(packageManager);
    }
  }

  /**
   * Disposes file watcher resources
   */
  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
    this.disposables = [];
    Logger.debug('File watcher stopped');
  }
}
