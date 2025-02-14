# Change Log

All notable changes to the "git-livesync" extension will be documented in this file.

## [v0.0.1] - 07/02/2025

### Added

- Automatic Git Commits: Automatically commits changes to the repository on file modification or creation.
- Customizable Commit Delay: Users can set a delay between commits through the configuration settings.
- Ignore Patterns Management: Integrates with `.gitignore` to ignore specified patterns when making commits.
- Responsive to Configuration Changes: Listens for and adapts to changes in user settings dynamically.

## [v0.1.0] - 11/02/2025

### Added

- Automatic Pulling on Interval: Automatically pulls from the remote branch on a configured interval.

## [v0.1.1] - 14/02/2025

### Fixed

- Auto Commit setting did not actually get used. It now checks before committing if you have it enabled

## [v0.1.2] - 14/02/2025

### Fixed

- Added check to see if extension is enabled before auto pulling
