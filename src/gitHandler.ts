/**
 * @fileoverview Handles Git operations.
 */

import * as vscode from "vscode";
import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";
import { getCommitDelay, getWorkspacePath, sleep } from "./utils";

/**
 * Class to handle Git operations.
 */
export class GitHandler {
  private context: vscode.ExtensionContext;
  private git: SimpleGit;
  private inProgress: boolean;

  /**
   * Constructs a GitHandler instance.
   * @param {vscode.ExtensionContext} context - The extension context.
   */
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.inProgress = false;
    const options: Partial<SimpleGitOptions> = {
      baseDir: getWorkspacePath(),
      binary: "git",
      maxConcurrentProcesses: 6,
      trimmed: false,
    };
    this.git = simpleGit(options);
  }

  /**
   * Commits changes to the configured remote.
   */
  public async commit() {
    if (this.inProgress) {
      vscode.window.showWarningMessage("Commit in progress.");
      return;
    }

    vscode.window.showInformationMessage("Starting commit...");
    this.inProgress = true;
    const lastCommitTimestamp = await this.getLastCommitTimestamp();
    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const timeSinceLastCommit = now - lastCommitTimestamp; // in seconds
    const timeDelta = getCommitDelay() - timeSinceLastCommit;
    const commitMessage = new Date().toLocaleString();
    vscode.window.showInformationMessage(
      "Last commit was at " +
        lastCommitTimestamp +
        ". It's been " +
        timeSinceLastCommit +
        "ms since then."
    );

    const sleepDuration = Math.max(0, timeDelta); // sleep should handle negative numbers but we are evil
    vscode.window.showInformationMessage(
      "Sleeping for " + sleepDuration + "seconds."
    );
    await sleep(1000 * sleepDuration);
    await this.git.pull().add(".").commit(commitMessage).push();
    vscode.window.showInformationMessage("Committed to remote.");
    this.inProgress = false;
  }

  /**
   * Retrieves the timestamp of the last commit in UNIX format.
   * @returns {Promise<number>} - The last commit timestamp.
   */
  private async getLastCommitTimestamp(): Promise<number> {
    vscode.window.showInformationMessage(
      "Getting the timestamp of the latest commit."
    );
    const log = await this.git.log(["-1", "--format=%ct"]);
    console.log("log", log);
    return log.latest
      ? parseInt(log.latest.hash, 10)
      : Math.floor(Date.now() / 1000); // Date.now() as default
  }
}
