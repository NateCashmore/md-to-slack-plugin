interface SlackBlock {
	type: string;
	text: {
		type: string;
		text: string;
	};
}

interface SlackFormat {
	blocks: SlackBlock[];
}
