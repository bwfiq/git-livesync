# [git-livesync](https://marketplace.visualstudio.com/items?itemName=bwfiq.git-livesync)

A VS Code extension to watch for file changes and automatically sync them to the configured Git remote.

## Features

- Automatic Git Commits: Automatically commits changes to the repository whenever files are modified or created, ignoring files that are excluded in the `.gitignore`.
- Customizable Commit Delay: Configure the delay between commits through settings.

## Installation

To install the Git Live Sync extension, follow these steps:

1. Clone this repository:

```bash
   git clone https://github.com/bwfiq/git-livesync
   cd git-livesync
```

2. Install dependencies:

```bash
npm install
```

3. Build the extension:

```bash
vsce package
```

4. Install the .vsix file in Visual Studio Code:
   - Open VS Code and go to the "Extensions" view (Ctrl+Shift+X).
   - Click on the three dots in the upper right corner and select "Install from VSIX..."
   - Select the generated .vsix file.

## Usage

1. Open your project in Visual Studio Code.
2. Configure the extension by adding settings in your `settings.json` file. For example:
   ```json
   {
     "git-livesync.commitDelay": 30,
     "git-livesync.enabled": true
   }
   ```
3. The extension will now watch for file changes and commit them automatically.

## Configuration

| Key                                   | Type    | Description                                                                                                                                                                  |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `git-livesync.enabled`                | Boolean | **CAUTION:** DO NOT ENABLE THIS FOR USER UNLESS YOU KNOW WHAT YOU ARE DOING! Specifies whether to enable this extension in the current workspace. Default is `false`.        |
| `git-livesync.autoPull`               | Boolean | Enables automatically pulling from the current branch after a delay configured by `git-livesync.autoPullDelay`. Default is `true`.                                           |
| `git-livesync.autoPullDelay`          | Integer | If `git-livesync.autoPull` is enabled, automatically pulls from the remote branch every X seconds. Default is 5 seconds.                                                     |
| `git-livesync.autoCommitAndSync`      | Boolean | Enables automatically committing to the remote branch after a delay configured by `git-livesync.autoCommitAndSyncDelay`. Default is `true`.                                  |
| `git-livesync.autoCommitAndSyncDelay` | Integer | If `git-livesync.autoCommitAndSync` is enabled, automatically commits to the remote branch on a file change if it is X seconds after the last commit. Default is 30 seconds. |

## Development

To set up a development environment for the Git Live Sync extension, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd git-livesync
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Open the project in Visual Studio Code**.

4. **Build the extension**:

   ```bash
   npm run build
   ```

5. **Launch the Extension**:
   - Press `F5` to run the extension in a new Extension Development Host instance of VS Code.

## TODO

- Benchmark and remove any slowdowns
- Add a setting to adjust pull and push behaviour instead of always syncing on commit
- Add error handling for if workspace doesn't have `.git/` or `.gitignore`

## Contributing

Contributions to the Git Live Sync extension are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the GNU AGPL v3 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This extension utilizes [simple-git](https://www.npmjs.com/package/simple-git) and [ignore](https://www.npmjs.com/package/ignore) for Git operations.

## Known Issues

- [x] There is no cooldown. It will spam commits for every single tiny change.
- [x] The cooldown is hardcoded to 5 seconds. There is no setting for it.
- [x] There are no workspace-specific settings. It will watch every single opened folder.
- [x] The terminals created are spammed like crazy.
- [x] You need to run a command from the palette to activate the extension.
- [x] It is not packaged as a .vsix file yet.
- [ ] There is no error checking for if the workspace is a git repository or not.
- [ ] There is no error checking for if a .gitignore exists.
