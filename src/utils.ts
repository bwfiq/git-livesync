import * as vscode from "vscode";

/**
 * @fileoverview Utility functions for workspace operations.
 */

let commitDelay: number = 30;
let enabled: boolean = false;
let workspacePath: string = "";

/**
 * Gets the current commit delay.
 * @returns {number} - The current commit delay configured in the settings.
 */
export function getCommitDelay(): number {
  return commitDelay;
}

/**
 * Gets the current enabled status.
 * @returns {boolean} - The current enabled status configured in the settings.
 */
export function getEnabled(): boolean {
  return enabled;
}

/**
 * Gets the current working directory from the VS Code API.
 * @returns {string} - The current working directory.
 */
export function getWorkspacePath(): string {
  return workspacePath;
}

/**
 * Gets the commit delay from configuration and subscribes to configuration changes.
 */
function initializeCommitDelay() {
  const configuredCommitDelay = vscode.workspace
    .getConfiguration("git-livesync")
    .get<number>("commitDelay");

  if (typeof configuredCommitDelay === "number") {
    commitDelay = configuredCommitDelay;
    console.log(`Initial Commit Delay: ${commitDelay} seconds`);
  } else {
    console.error("Couldn't get commit delay");
  }

  // Listen for configuration changes
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("git-livesync.commitDelay")) {
      const newDelay = vscode.workspace
        .getConfiguration("git-livesync")
        .get<number>("commitDelay");

      if (typeof newDelay === "number") {
        commitDelay = newDelay;
        console.log(`Updated Commit Delay: ${commitDelay} seconds`);
      }
    }
  });
}

/**
 * Gets the commit delay from configuration and subscribes to configuration changes.
 */
function initialiseEnabled() {
  const configuredEnabled = vscode.workspace
    .getConfiguration("git-livesync")
    .get<boolean>("enabled");

  if (typeof configuredEnabled === "boolean") {
    enabled = configuredEnabled;
  } else {
    console.error("Couldn't get enabled status");
  }

  // Listen for configuration changes
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("git-livesync.enabled")) {
      const configuredEnabled = vscode.workspace
        .getConfiguration("git-livesync")
        .get<boolean>("enabled");

      if (typeof configuredEnabled === "boolean") {
        enabled = configuredEnabled;
        console.log(`Enabled: ${enabled}`);
      } else {
        console.error("Couldn't get enabled status");
      }
    }
  });
}

/**
 * Gets the workspace path and keeps it updated.
 * @returns {string} - The workspace path or empty if no workspace folder exists.
 */
function initialiseWorkspacePath() {
  if (vscode.workspace.workspaceFolders) {
    workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
  }

  // Listen for configuration changes
  vscode.workspace.onDidChangeWorkspaceFolders((event) => {
    if (vscode.workspace.workspaceFolders) {
      workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
  });
}

/**
 * Initialises all the necessary global variables.
 */
export function initialise(): void {
  initializeCommitDelay();
  initialiseEnabled();
  initialiseWorkspacePath();
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
