# Obsidian Sidebar Notes List

A plugin for [Obsidian](https://obsidian.md) that displays your notes in a reverse chronological list in the left sidebar.

## Installation

### From Obsidian Community Plugins

***Coming soon.** This plugin is not yet available through the Community plugins library.*

### Manual Installation

1. Download the latest release from the [GitHub releases page](https://github.com/adammarcstevenson/obsidian-sidebar-notes-list/releases)
2. Extract the files into your Obsidian vault's `.obsidian/plugins/sidebar-notes-list` directory
3. Restart Obsidian
4. Enable the plugin in the **Community plugins** section of the settings

## Usage

1. After installation, a new "Notes" icon will appear in your left sidebar ribbon
2. Click it to open the notes list panel
3. Your notes will be displayed in reverse chronological order
4. Use the search bar at the top to filter notes by name
5. Use the action buttons to create new notes or change sort order
6. Right-click on a note for additional options

### Keyboard Shortcuts

- `Ctrl/Cmd + Shift + L`: Open the notes list and focus the search bar

## Configuration

The plugin settings can be accessed via the Obsidian settings panel under **Sidebar Notes List**:

- **Sort by**: Choose between "Last modified" (default) or "Created" sorting
- **Show parent folder**: Toggle display of each note's parent folder
- **Pinned files**: Toggle the ability to pin files to the top of the list
- **Open note in**: Choose the default behavior when clicking a note (tab, split, or window)
- **Omitted pathname patterns**: Specify glob patterns to exclude certain files from the list

### Filtering

You can exclude files from the list by adding glob patterns to the **Omitted paths** setting. One pattern per line, for example:

```
daily/*
*.pdf
*.{jpg,png,gif}
```

## Contributing

***Coming soon.** I'm not ready to take contributions just yet.*

## License

This project is licensed under the GNU GPL v3 - see the [LICENSE](LICENSE) file for details.

## Author

Created by [Adam Stevenson](https://adammarcstevenson.com)