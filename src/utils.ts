import * as vscode from "vscode";

/**
 * @fileoverview Utility functions for workspace operations.
 */

/**
 * Retrieves a configuration setting from the "git-livesync" settings.
 *
 * @template T - The type of the configuration setting to be retrieved.
 * @param {string} settingName - The name of the setting to retrieve.
 * @param {T} defaultValue - The value to return if the setting is not found or is undefined.
 * @returns {T} - The value of the specified setting, or the default value if not found.
 */
function getSetting<T>(settingName: string, defaultValue: T): T {
  const configuredValue = vscode.workspace
    .getConfiguration("git-livesync")
    .get<T>(settingName);

  return configuredValue !== undefined ? configuredValue : defaultValue;
}

/**
 * Gets the current enabled status for the "git-livesync" extension.
 *
 * @returns {boolean} - The current enabled status configured in the settings. Defaults to false if not set.
 */
export function getEnabled(): boolean {
  return getSetting<boolean>("enabled", false);
}

/**
 * Gets the commit delay configured for the "git-livesync" extension.
 *
 * @returns {number} - The commit delay in seconds, or -1 if not configured.
 */
export function getCommitDelay(): number {
  return getSetting<number>("commitDelay", -1);
}

/**
 * Gets the workspace path and keeps it updated.
 * @returns {string} - The workspace path or empty if no workspace folder exists.
 */
export function getWorkspacePath() {
  if (vscode.workspace.workspaceFolders) {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  } else {
    throw new Error("Couldn't get workspace path.");
  }
}

/**
 * Returns a promise that resolves after a specified time in milliseconds.
 * @param milliseconds - The time to sleep in milliseconds.
 * @returns A promise that resolves after the specified time.
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    if (milliseconds <= 0) {
      resolve();
    } else {
      setTimeout(resolve, milliseconds);
    }
  });
}
