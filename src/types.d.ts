export type SlackBlock = {
	type: string;
	text: {
		type: string;
		text: string;
	};
}

export type SlackFormat = {
	blocks: SlackBlock[];
}


