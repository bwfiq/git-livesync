/**
 * @fileoverview Main entry point of the git-livesync extension.
 */

import * as vscode from "vscode";
import { GitHandler } from "./gitHandler";
import { IgnoreHandler } from "./ignoreHandler";
import { Watcher } from "./watcher";

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
export function activate(context: vscode.ExtensionContext) {

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
