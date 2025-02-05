/**
 * @fileoverview Utility functions for workspace operations.
 */

import * as vscode from 'vscode';

/**
 * Gets the workspace path.
 * @returns {string | undefined} - The workspace path or undefined if no workspace folder exists.
 */
export function getWorkspacePath(): string | undefined {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder found.');
        return undefined;
    }
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
}