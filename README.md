# git-livesync

A VS Code extension to watch for file changes and automatically sync them to the configured Git remote.

## Features

- Hooks into VS Code's API to watch for file changes
- If the file is not in the `.gitignore` or under `.git/`, it initiates a commit-and-sync with the timestamp and date.

## Requirements

- Node.js version 12.x or above is required.
- Compatible with Visual Studio Code version 1.56.0 or later.
- The extension uses the [`ignore`](https://www.npmjs.com/package/ignore) library for processing `.gitignore` files.
  
  To install required dependencies, run:
  ```bash
  npm install
  ```

## Extension Settings

This extension contributes the following settings:

* not yet!

## Known Issues

- There is no cooldown. It will spam commits for every single tiny change.
- There are no workspace-specific settings. It will watch every single opened folder.
- There is no error checking for if the workspace is a git repository or not.
- There is no error checking for if a .gitignore exists. 

## Release Notes

### Unreleased
- Auto commit-and-sync on file change