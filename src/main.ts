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

		new Setting(containerEl)
			.setName('Slack Block Kit Builder URL')
			.setDesc('URL associated with Slack Block Kit Builder.  Please not you MUST goto https://app.slack.com/block-kit-builder and' +
				' update this value with the generated ID ... e.g. https://app.slack.com/block-kit-builder/XXXXXXXX where XXXXXXXX is the ID.  ' +
				'Slack will automatically generate this ID for you when you goto that URL.')
			.addText(text => text
				.setPlaceholder('https://app.slack.com/block-kit-builder/XXXXXXXX')
				.setValue(this.plugin.settings.slackBlockKitBuilderURL)
				.onChange(async (value) => {
					this.plugin.settings.slackBlockKitBuilderURL = value;
					await this.plugin.saveSettings();
				}));
	}
}
