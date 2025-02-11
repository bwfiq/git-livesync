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
 * Gets the current enabled status in the configuration.
 *
 * @returns {boolean} - The current enabled status configured in the settings. Defaults to false if not set.
 */
export function getEnabled(): boolean {
  return getSetting<boolean>("enabled", false);
}

/**
 * Gets the auto-pull setting in the configuration.
 *
 * @returns {boolean} - True if automatic pulling is enabled, false otherwise. Defaults to true if not set.
 */
export function getAutoPull(): boolean {
  return getSetting<boolean>("autoPull", true);
}

/**
 * Gets the auto-pull delay configured in the configuration.
 *
 * @returns {number} - The delay in seconds for auto-pulling, or the default of 5 seconds if not configured.
 */
export function getAutoPullDelay(): number {
  return getSetting<number>("autoPullDelay", 5);
}

/**
 * Gets the auto-commit and sync setting in the configuration.
 *
 * @returns {boolean} - True if automatic committing and syncing is enabled, false otherwise. Defaults to true if not set.
 */
export function getAutoCommitAndSync(): boolean {
  return getSetting<boolean>("autoCommitAndSync", false);
}

/**
 * Gets the auto-commit and sync delay configured in the configuration.
 *
 * @returns {number} - The delay in seconds for auto-committing after a file change, or the default of 30 seconds if not configured.
 */
export function getAutoCommitAndSyncDelay(): number {
  return getSetting<number>("autoCommitAndSyncDelay", 30);
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
