/**
 * @fileoverview Handles Git operations.
 */

import * as vscode from "vscode";
import { getCommitDelay, getWorkspacePath } from "./utils";

/**
 * Class to handle Git operations.
 */
export class GitHandler {
  private context: vscode.ExtensionContext;

  /**
   * Constructs a GitHandler instance.
   * @param {vscode.ExtensionContext} context - The extension context.
   */
  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  /**
   * Commits changes to the configured remote.
   * @param {string} filePathRelative - Relative file path.
   * @param {string} action - What action was performed to the file.
   */
  public async commit(filePathRelative: string, action: string) {
    const workspacePath = getWorkspacePath();
    if (!workspacePath) {
      return;
    }

    // Get the last commit time and don't commit if it's too soon
    const lastCommitTimestamp = await this.getLastCommitTimestamp(
      workspacePath
    );
    const now = Math.floor(Date.now() / 1000); // Unix timestamp in seconds

    if (
      !(lastCommitTimestamp && now - lastCommitTimestamp < getCommitDelay())
    ) {
      const date = new Date();
      const commitMessage = `${date.toLocaleString()}: ${action} ${filePathRelative}`;
      const terminal = vscode.window.createTerminal("git-livesync");

      terminal.sendText(`cd ${workspacePath}`);
      terminal.sendText(
        'git pull \
            && git add . \
            && git commit -am "' +
          commitMessage +
          '" && git push'
      );
      terminal.sendText(`exit`);
      vscode.window.showInformationMessage(
        `Made commit with name ${commitMessage}.`
      );
    }
  }

  /**
   * Retrieves the timestamp of the last commit in UNIX format.
   * @param {string} workspacePath - The path to the workspace.
   * @returns {Promise<number | null>} - The last commit timestamp or null if no commits exist.
   */
  private async getLastCommitTimestamp(
    workspacePath: string
  ): Promise<number | null> {
    return new Promise((resolve) => {
      const { exec } = require("child_process");
      exec(
        "git -C " + workspacePath + " log -1 --format=%ct",
        (error: any, stdout: string, stderr: string) => {
          if (error) {
            console.error(`Error getting last commit time: ${stderr}`);
            resolve(null);
            return;
          }
          resolve(parseInt(stdout.trim(), 10)); // Return as a number
        }
      );
    });
  }
}
