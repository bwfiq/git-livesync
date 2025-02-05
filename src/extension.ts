// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import ignore from 'ignore';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-livesync" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('git-livesync.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello.');
	});

	context.subscriptions.push(disposable);

    // Add the .gitignore patterns and the .git folder to the ignore list
    const gitignorePath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.gitignore');
    let git_ignore_patterns: string[] = [];

    if (fs.existsSync(gitignorePath)) {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
        git_ignore_patterns = gitignoreContent.split('\n').filter(line => line && !line.startsWith('#'));
        vscode.window.showInformationMessage(`.gitignore patterns: ${git_ignore_patterns.join(', ')}`);
    }
    git_ignore_patterns.push('.git');
    const ig = ignore().add(git_ignore_patterns);

    // Watch for file changes and commit them if not ignored
    const handleFileEvent = (event: vscode.Uri, action: string) => {
        const file_path = event.fsPath;
        const relative_file_path = path.relative(vscode.workspace.workspaceFolders[0].uri.fsPath, file_path);

        if (ig.ignores(relative_file_path)) {
            vscode.window.showInformationMessage(`Ignoring ${relative_file_path}`);
        }
        else {
            vscode.window.showInformationMessage(`File ${relative_file_path} ${action}`);
            // Commit to git with timestamp and date
            const date = new Date();
            const commit_message = `${action} ${relative_file_path} at ${date.toISOString()}`;
            const terminal = vscode.window.createTerminal('Git LiveSync');
            terminal.sendText(`cd ${vscode.workspace.workspaceFolders[0].uri.fsPath}`);
            terminal.sendText(`git pull && git add . && git commit -m "${commit_message}" && git push`);
        }
    };

    const watcher = vscode.workspace.createFileSystemWatcher('**/*');
    watcher.onDidChange((e) => {
        handleFileEvent(e, 'changed');
    });
    
    watcher.onDidCreate((e) => {
        handleFileEvent(e, 'created');
    });
    
    watcher.onDidDelete((e) => {
        handleFileEvent(e, 'deleted');
    });

    context.subscriptions.push(watcher);
}

// This method is called when your extension is deactivated
export function deactivate() {}
