# Overview

This is a vault that demonstrates how to automate weekly notes based on daily notes in Obsidian.

# Screenshots

- Daily Notes
- Weekly Notes

# Key Features

- Daily Notes
    - Date Navigation
        - Two days ago, one day ago, today, tomorrow, the day after tomorrow.
        - Hover to quickly view or create a file if it doesn't exist.
            - The file is created in the daily note location, but you need to manually apply a template.
    - Weekly Note Shortcut
        - If the weekly note doesn't exist, a file will be created, but you need to manually apply a template.
    - Same Date Notes from Different Years
    - Unfinished Tasks Due This Week
    - Logs
        - Plan and write down tasks for the day at the start.
    - Morning / Afternoon / Evening
        - Sections to write tasks according to the time of day.
    - Retrospect
        - Use inline fields that can be referenced in the weekly note.
        - You can use inline fields in specific time sections or anywhere in the document.
    - Notes Created/Modified Today
- Weekly Notes
    - Gathers and displays [inline fields](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#inline-fields) from daily notes within the week.
    - For `video` fields, it displays YouTube thumbnails, titles, and channel names.
    - Notes Created/Modified During the Week

# Plugins Used

- Templates
    - Used for daily and weekly note templates.
- Calendar
    - Used to set the start of the week as Monday.
- Dataview
    - Displays notes created or modified on the specified date in the daily note.
    - Used in the weekly note to collect and display contents from daily notes of that week.
- Periodic Notes
    - Generates daily and weekly notes.
- Tasks
    - Task management.
- Templater
    - Works with templates to set dates, times, and cursor positions.

# Key Settings

These are the changes made in the vault’s default Obsidian and plugin settings. Items marked as (optional) are personal preferences. All other settings are necessary for the setup.

- (Optional) Editor
    - (Optional) Disable readable line length.
    - (Optional) Show frontmatter.
    - (Optional) Show line numbers.
- Files & Links
    - (Optional) Recognize all file extensions.
        - Enabled to display `.js` script files.
- Core Plugins - Templates
    - Set the template folder path.
- Community Plugins
    - Calendar
        - Start week on: Monday
            - **All work is based on Monday as the start of the week. If you want to set it to Sunday, additional modifications are needed.**
        - (Optional) Show week number.
    - Dataview
        - Enable JavaScript queries.
        - Enable inline JavaScript queries.
    - Templater
        - Template folder location: Same as template folder path.
        - Automatic jump to cursor:
            - Used to automatically jump to the position marked with `<% tp.file.cursor() %>`.
    - Periodic Notes
        - Daily Notes
            - Daily Note Template: Set to `templates/daily_journal.md`.
            - Note Folder: Set to `journals/2024` for daily notes.
        - Weekly Notes
            - Weekly Note Template: Set to `templates/weekly_journal.md`.
            - Note Folder: Set to `journals/2024` for weekly notes.
    - Tasks
        - No additional settings needed.

# CSS

- Located in `.obsidian/snippets`, added for better usability.
- Can be enabled in Settings - Appearance - CSS Snippets.
    - `checkbox-done-no-strikethrough`
        - Removes the strikethrough on completed checkbox items for better readability.
    - `retrospect-dataview`
        - Enhances the appearance of the Dataview in weekly notes.
