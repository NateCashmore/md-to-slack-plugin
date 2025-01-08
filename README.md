# Md To Slack Plugin
This is a plugin for Obsidian (https://obsidian.md) that will allow you to convert an open note to a Slack message.

## How to use
Once installed, enabled and the settings configured (See below), this plugin will display a Slack icon in the ribbon.

![Slack icon in Obsidian ribbon](/docs/SlackRibbonIcon.png)]

Clicking on this button will open a new tab in your browser with the Slack message pre-filled with the 
contents of the note.

## Settings
A single setting parameter is required that is the Slack Block Kit Builder URL.  This URL requires a Slack ID that on the end
of the url that is used to identify the user.  This can be found by going to the [Slack Block Kit Builder](https://app.slack.com/block-kit-builder) 
and copying the first part of the URL. e.g.

When you visit the Slack Block Kit Builder, the URL will look something like this:
```
https://app.slack.com/block-kit-builder/ABCD1234#%7B%22blocks%22:%5B%7B%22type%22:%22section%22,%22text.. blah blah blah
```
The Slack ID is the `ABCD1234` part of the URL.  So the setting you need to add would be:
```
https://app.slack.com/block-kit-builder/ABCD1234
```

## Funding and Support
If you would like to support the development of this plugin, you can do so by buying me a coffee.  This will help me to continue to develop and maintain this plugin.  You can do this by clicking the link below:

[![Buy me a coffee](/docs/bmc-button.svg)](https://www.buymeacoffee.com/nathan.cashmore)
