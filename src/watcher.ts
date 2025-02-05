/**
 * @fileoverview Watches for file changes.
 */

import * as vscode from 'vscode';
import { GitHandler } from './gitHandler';
import { IgnoreHandler } from './ignoreHandler';
import { getWorkspacePath } from './utils';
import path from 'path';

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

        const fileWatcher = vscode.workspace.createFileSystemWatcher('**/*');
        fileWatcher.onDidChange((uri) => this.onChange(uri, 'changed'));
        fileWatcher.onDidCreate((uri) => this.onChange(uri, 'created'));
        fileWatcher.onDidDelete((uri) => this.onChange(uri, 'deleted'));
    }

    /**
     * Handles a file change event.
     * @param {vscode.Uri} uri - The file URI.
     * @param {string} action - The action (changed, created, deleted) that occurred.
     */
    private onChange(uri: vscode.Uri, action: string) {
        const workspacePath = getWorkspacePath();
        if (!workspacePath) {
            return;
        }
        const filePath = uri.fsPath;
        const relativeFilePath = path.relative(workspacePath, filePath);

        if (this.ignoreHandler.ignores(relativeFilePath)) {
            //vscode.window.showInformationMessage(`Ignoring ${relativeFilePath}`);
        } else {
            //vscode.window.showInformationMessage(`${action} ${relativeFilePath}`);
            this.gitHandler.commit(relativeFilePath, action);
        }
    }

    /**
     * Disposes of the watcher.
     */
    public dispose() {}
}