# git-livesync

A VS Code extension to watch for file changes and automatically sync them to the configured Git remote.

## Features

- Hooks into VS Code's API to watch for file changes
- If the file is not in the `.gitignore` or under `.git/`, it initiates a commit-and-sync with the timestamp and date.

### TODO
- Add a setting to adjust the delay for commit-and-sync
- Add a setting to adjust pull and push behaviour instead of always syncing on commit
- Add auto pulling irrespective of file changes
- Add settings that require it to be enabled for every specific workplace through settings.json
- Add error handling for if workspace doesn't have `.git/` or `.gitignore`
- Either close the terminals after exec or just use exec

## Requirements

Take note that the extension works only with remote repositories (for now).

- Node.js version 12.x or above is required.
- Compatible with Visual Studio Code version 1.56.0 or later.
- The extension uses the [`ignore`](https://www.npmjs.com/package/ignore) library for processing `.gitignore` files.
  
  To install required dependencies, run:
  ```bash
  npm install
  ```

## Extension Settings

This extension contributes the following settings:

* `git-livesync.enable`: Enable/disable this extension.
* `git-livesync.commitDelay`: Only commit if this amount of time in milliseconds has passed since the last commit.

## Known Issues

- [x] There is no cooldown. It will spam commits for every single tiny change.
- [ ] The cooldown is hardcoded to 5 seconds. There is no setting for it.
- There are no workspace-specific settings. It will watch every single opened folder.
- There is no error checking for if the workspace is a git repository or not.
- There is no error checking for if a .gitignore exists. 
- It is not packaged as a .vsix file yet.
- The terminals created are spammed like crazy.

## Release Notes

### Unreleased
#### v0.0.1
- Auto commit-and-sync on file change after delay
- Enabled per workspace-specific setting
- Settings to configure delay in ms for commit-and-sync