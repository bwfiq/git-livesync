/**
 * @fileoverview Main entry point of the git-livesync extension.
 */

import * as vscode from "vscode";
import { GitHandler } from "./gitHandler";
import { IgnoreHandler } from "./ignoreHandler";
import { Watcher } from "./watcher";
import {
  getCommitDelay,
  getEnabled,
  initialiseEnabled,
  initializeCommitDelay,
} from "./utils";

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "git-livesync" is now active!');

  // Initialise global variables
  initialiseEnabled();
  initializeCommitDelay();

  // Initialise the handlers
  const gitHandler = new GitHandler(context);
  const ignoreHandler = new IgnoreHandler();

  // Initialise a file system watcher to commit on file changes
  const watcher = new Watcher(gitHandler, ignoreHandler);
  context.subscriptions.push(watcher);

  // TODO: Add a commit-and-sync on scheduled time instead of watcher

  // Debug Messages
  const disposable = vscode.commands.registerCommand(
    "git-livesync.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello World from git-livesync!");
      vscode.window.showInformationMessage(`Enabled: ${getEnabled()}`);
      vscode.window.showInformationMessage(`Commit Delay: ${getCommitDelay()}`);
    }
  );
  context.subscriptions.push(disposable);
}

/**
 * Deactivates the extension.
 */
export function deactivate() {}
