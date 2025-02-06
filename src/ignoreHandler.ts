/**
 * @fileoverview Manages ignore patterns.
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import ignore from 'ignore';
import { getWorkspacePath } from './utils';

/**
 * Class to manage ignore patterns.
 */
export class IgnoreHandler {
    private ig: any;

    /**
     * Constructs an IgnoreHandler instance and loads patterns from .gitignore.
     */
    constructor() {
        const gitignorePath = path.join(getWorkspacePath(), '.gitignore');
        let gitIgnorePatterns: string[] = [];

        if (fs.existsSync(gitignorePath)) {
            const gitIgnoreContent = fs.readFileSync(gitignorePath, 'utf8');
            gitIgnorePatterns = gitIgnoreContent.split('\n').filter((line) => line && !line.startsWith('#'));
        }

        gitIgnorePatterns.push('.git');
        this.ig = ignore().add(gitIgnorePatterns);
    }

    /**
     * Checks if a file path should be ignored.
     * @param {string} relativeFilePath - The file path.
     * @returns {boolean} Whether the file should be ignored.
     */
    public ignores(relativeFilePath: string): boolean {
        return this.ig.ignores(relativeFilePath);
    }
}