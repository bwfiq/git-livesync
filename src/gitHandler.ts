/**
 * @fileoverview Handles Git operations.
 */

import * as vscode from "vscode";
import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git";
import * as utils from "./utils";

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
      baseDir: utils.getWorkspacePath(),
      binary: "git",
      maxConcurrentProcesses: 6,
      trimmed: false,
    };
    this.git = simpleGit(options);

    // Start automatic pulling
    this.startAutoPull();
  }

  /**
   * Starts the automatic pulling process based on the configured delay.
   */
  private startAutoPull() {
    // Use a recursive function for continuous pulling
    const pullLoop = async () => {
      if (utils.getEnabled() && utils.getAutoPull()) {
        await this.pull(); // Attempt to pull
      }

      // Wait for the configured delay before repeating the pull
      setTimeout(pullLoop, 1000 * utils.getAutoPullDelay());
    };

    // Initiate the first pull
    pullLoop();
  }

  /**
   * Commits changes to the configured remote.
   */
  public async commit() {
    // Debouncing to ensure two processes don't start
    if (this.inProgress) {
      return;
    }

    this.inProgress = true;
    const lastCommitTimestamp = await this.getLastCommitTimestamp();
    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds
    const timeSinceLastCommit = now - lastCommitTimestamp; // in seconds
    const timeDelta = utils.getAutoCommitAndSyncDelay() - timeSinceLastCommit;
    const commitMessage = new Date().toLocaleString();
    const sleepDuration = Math.max(0, timeDelta); // sleep should handle negative numbers but we are evil

    await utils.sleep(1000 * sleepDuration);
    await this.git.pull().add(".").commit(commitMessage).push();
    this.inProgress = false;
  }

  /**
   * Commits changes to the configured remote.
   */
  public async pull() {
    // Debouncing to ensure two processes don't start
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;

    await this.git.pull();
    this.inProgress = false;
  }

  /**
   * Retrieves the timestamp of the last commit in UNIX format.
   * @returns {Promise<number>} - The last commit timestamp.
   */
  private async getLastCommitTimestamp(): Promise<number> {
    const log = await this.git.log(["-1", "--format=%ct"]); // gets the UNIX time in ms of the latest commit
    return log.latest
      ? parseInt(log.latest.hash, 10)
      : Math.floor(Date.now() / 1000); // Date.now() as default if we don't find any commits
  }
}
