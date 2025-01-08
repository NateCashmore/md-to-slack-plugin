import { App, MarkdownView, Plugin, PluginSettingTab, Setting } from 'obsidian';
import Converter from './converter';
interface MdToSlackSettings {
	slackBlockKitBuilderURL: string;
}

const DEFAULT_SETTINGS: MdToSlackSettings = {
	slackBlockKitBuilderURL: 'https://app.slack.com/block-kit-builder/XXXXXXXX'
}

export default class MdToSlack extends Plugin {
	settings: MdToSlackSettings;

	async onload() {
		await this.loadSettings();

		this.addRibbonIcon('slack', 'MdToSlack', async (evt: MouseEvent) => {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if (view) {
				const url = await Converter.convertMarkdownToSlack(this.settings, view.getDisplayText(), view.getViewData())
				open(url)
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MdToSlackSettingTab(this.app, this));
	}

	onunload() {
	}
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class MdToSlackSettingTab extends PluginSettingTab {
	plugin: MdToSlack;

	constructor(app: App, plugin: MdToSlack) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		const descDocument = new DocumentFragment();
		descDocument.appendText('URL associated with Slack Block Kit Builder.');
		descDocument.append(document.createElement('br'));
		descDocument.append(document.createElement('br'));
		descDocument.appendText('You will need to goto ');

		const a = document.createElement('a');
		const linkText = document.createTextNode("https://app.slack.com/block-kit-builder");
		a.appendChild(linkText);
		a.title = "Slack Block Kit Builder";
		a.href = "https://app.slack.com/block-kit-builder";
		descDocument.appendChild(a);

		descDocument.appendText(' and update this value with the generated ID:');
		descDocument.append(document.createElement('br'));
		descDocument.append(document.createElement('br'));

		const i = document.createElement('I');
		const italicText = document.createTextNode("e.g. https://app.slack.com/block-kit-builder/XXXXXXXX where XXXXXXXX is the ID.");
		i.appendChild(italicText);
		descDocument.appendChild(i);
		descDocument.append(document.createElement('br'));
		descDocument.append(document.createElement('br'));

		descDocument.appendText('Slack will automatically generate this ID for you when you goto that URL.');

		new Setting(containerEl)
			.setName('Slack Block Kit Builder URL')
			.setDesc(descDocument)
			.addText(text => text
				.setPlaceholder('https://app.slack.com/block-kit-builder/XXXXXXXX')
				.setValue(this.plugin.settings.slackBlockKitBuilderURL)
				.onChange(async (value) => {
					this.plugin.settings.slackBlockKitBuilderURL = value;
					await this.plugin.saveSettings();
				}));
	}
}
