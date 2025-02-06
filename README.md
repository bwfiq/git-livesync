# git-livesync

A VS Code extension to watch for file changes and automatically sync them to the configured Git remote.

## Features

- Hooks into VS Code's API to watch for file changes
- If the file is not in the `.gitignore` or under `.git/`, it initiates a commit-and-sync with the timestamp and date.

### TODO

*Planned Features for v0.0.1:*
- Benchmark and remove any slowdowns

*At some point:*
- Add a setting to adjust pull and push behaviour instead of always syncing on commit
- Add auto pulling irrespective of file changes
- Add error handling for if workspace doesn't have `.git/` or `.gitignore`

## Requirements

Take note that the extension works only with remote repositories (for now).

- Node.js version 12.x or above is required.
- Node Dependencies: ignore, simple-git
- Compatible with Visual Studio Code version 1.56.0 or later.
- The extension uses the [`ignore`](https://www.npmjs.com/package/ignore) library for processing `.gitignore` files.
  
  To install required dependencies, run:
  ```bash
  npm install
  ```

## Extension Settings

This extension contributes the following settings:

* `git-livesync.enable`: Enable/disable this extension.
* `git-livesync.commitDelay`: Only commit if this amount of time in seconds has passed since the last commit.

## Known Issues

- [x] There is no cooldown. It will spam commits for every single tiny change.
- [x] The cooldown is hardcoded to 5 seconds. There is no setting for it.
- [x] There are no workspace-specific settings. It will watch every single opened folder.
- [x] The terminals created are spammed like crazy.
- [x] You need to run a command from the palette to activate the extension.
- [ ] There is no error checking for if the workspace is a git repository or not.
- [ ] There is no error checking for if a .gitignore exists. 
- [ ] It is not packaged as a .vsix file yet.

## Release Notes

### Unreleased
- Auto commit-and-sync on file change after delay
- Enabled per workspace-specific setting
- Settings to configure delay in ms for commit-and-sync
- Option to set a scheduled time or every x seconds/minutes to commit-and-sync

# Development
- Get the configuration settings with `getEnabled()` and `getCommitDelay()` (defined and updated in [`utils.ts`](utils.ts))