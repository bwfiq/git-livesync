/**
 * @fileoverview Watches for file changes.
 */

import * as vscode from "vscode";
import { GitHandler } from "./gitHandler";
import { IgnoreHandler } from "./ignoreHandler";
import { getEnabled, getWorkspacePath } from "./utils";
import path from "path";

/**
 * Class to manage file system watching.
 */
export class Watcher implements vscode.Disposable {
  private gitHandler: GitHandler;
  private ignoreHandler: IgnoreHandler;

  /**
   * Constructs a Watcher instance.
   * @param {GitHandler} gitHandler - The GitHandler instance.
   * @param {IgnoreHandler} ignoreHandler - The IgnoreHandler instance.
   */
  constructor(gitHandler: GitHandler, ignoreHandler: IgnoreHandler) {
    this.gitHandler = gitHandler;
    this.ignoreHandler = ignoreHandler;

    const fileWatcher = vscode.workspace.createFileSystemWatcher("**/*");
    fileWatcher.onDidChange((uri) => this.onChange(uri));
    fileWatcher.onDidCreate((uri) => this.onChange(uri));
    fileWatcher.onDidDelete((uri) => this.onChange(uri));
  }

  /**
   * Commits to remote upon a file change.
   * @param {uri} The location of the changed file.
   */
  private onChange(uri: vscode.Uri) {
    const filePath = uri.fsPath;
    const relativeFilePath = path.relative(getWorkspacePath(), filePath);

    // TODO: Check all files, not just the changed one
    if (!this.ignoreHandler.ignores(relativeFilePath)) {
      if (getEnabled()) {
        this.gitHandler.commit();
      }
    }
  }

  /**
   * Disposes of the watcher.
   */
  public dispose() {}
}
