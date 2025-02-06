/**
 * @fileoverview Main entry point of the git-livesync extension.
 */

import * as vscode from "vscode";
import { GitHandler } from "./gitHandler";
import { IgnoreHandler } from "./ignoreHandler";
import { Watcher } from "./watcher";
import { getCommitDelay, getEnabled, initialise } from "./utils";

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
export function activate(context: vscode.ExtensionContext) {
  vscode.window.showInformationMessage(`Hi.`);
  // Initialise global variables
  initialise();

  // Initialise the handlers
  const gitHandler = new GitHandler(context);
  const ignoreHandler = new IgnoreHandler();

  // Initialise a file system watcher to commit on file changes
  const watcher = new Watcher(gitHandler, ignoreHandler);
  context.subscriptions.push(watcher);

  // TODO: Add a commit-and-sync on scheduled time instead of watcher
}

/**
 * Deactivates the extension.
 */
export function deactivate() {}
