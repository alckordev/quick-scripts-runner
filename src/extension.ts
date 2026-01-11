import * as vscode from 'vscode';
import { Logger } from './utils/logger';
import { ConfigurationService } from './services/configuration-service';
import { PackageJsonReader } from './services/package-json-reader';
import { StatusBarService } from './services/status-bar-service';
import { PackageManagerDetector } from './core/package-manager-detector';
import { ScriptExecutor } from './core/script-executor';
import { ScriptsProvider } from './core/scripts-provider';
import { FileWatcher } from './core/file-watcher';
import { CommandRegistry } from './commands/command-registry';
import { RunScriptCommand } from './commands/run-script-command';
import { RefreshCommand } from './commands/refresh-command';
import { OpenPackageJsonCommand } from './commands/open-package-json-command';
import { ChangePackageManagerCommand } from './commands/change-package-manager-command';

/**
 * Activates the extension
 */
export function activate(context: vscode.ExtensionContext): void {
  Logger.initialize();
  Logger.info('Scripts Runner activated');

  // 1. Create base services
  const configService = new ConfigurationService();
  const packageJsonReader = new PackageJsonReader();
  const statusBarService = new StatusBarService();

  // 2. Create core components with dependency injection
  const packageManagerDetector = new PackageManagerDetector(configService);
  const scriptExecutor = new ScriptExecutor();
  const scriptsProvider = new ScriptsProvider(packageJsonReader, packageManagerDetector);

  // 3. Create TreeView
  const treeView = vscode.window.createTreeView('scriptsRunnerExplorer', {
    treeDataProvider: scriptsProvider,
  });

  context.subscriptions.push(treeView);

  // 4. Initialize StatusBar
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
  if (workspaceFolder && packageJsonReader.exists(workspaceFolder.uri.fsPath)) {
    const packageManager = packageManagerDetector.detect(workspaceFolder.uri.fsPath);
    statusBarService.update(packageManager);
  } else {
    statusBarService.hide();
  }

  // 5. Initialize FileWatcher
  const fileWatcher = new FileWatcher(scriptsProvider, statusBarService, packageManagerDetector);
  fileWatcher.start();
  context.subscriptions.push({ dispose: () => fileWatcher.dispose() });

  // 6. Create and register commands
  const commandRegistry = new CommandRegistry();

  const commands = [
    new RunScriptCommand(scriptExecutor, packageManagerDetector),
    new RefreshCommand(scriptsProvider),
    new OpenPackageJsonCommand(),
    new ChangePackageManagerCommand(configService, scriptsProvider, statusBarService),
  ];

  commandRegistry.registerAll(commands, context);

  // 7. Add disposables
  context.subscriptions.push(statusBarService);

  Logger.info('Scripts Runner initialized successfully');
}

/**
 * Deactivates the extension
 */
export function deactivate(): void {
  Logger.info('Scripts Runner deactivated');
  Logger.dispose();
}
