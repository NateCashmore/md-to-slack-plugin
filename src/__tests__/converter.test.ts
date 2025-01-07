import Converter from "../converter";
let slackifyMarkdown = require('slackify-markdown');

jest.mock('slackify-markdown')

const MARKDOWN_INPUT = `# Introduction
Should replace double quotes with "nothing"

Should replace new lines with a return string equivalent

Should maintain spacing between lines`

const EXPECTED_SLACK_OUTPUT = `# Introduction\nShould replace double quotes with nothing\n\nShould replace new lines with a return string equivalent\n\nShould maintain spacing between lines`
const TITLE_INPUT = 'Welcome Meeting'
const SLACK_URL = "https://app.slack.com/block-kit-builder/XXXXXX"

describe('Converter', () => {
  it('should produce header and markdown sections with correct encoding', async () => {
    (slackifyMarkdown as unknown as jest.Mock).mockResolvedValue(MARKDOWN_INPUT);

    const result = await Converter.convertMarkdownToSlack(
      {slackBlockKitBuilderURL: SLACK_URL}, TITLE_INPUT, "See Mock resolved value above");

    const decodedResult = decodeURIComponent(result)

    // Check that the result contains the slack URL and a hash
    expect(decodedResult).toContain(SLACK_URL + "#")

    const messageJsonAsString = decodedResult.replace(SLACK_URL + '#', '')
    const messageJson = JSON.parse(messageJsonAsString)

    // Check that the message contains the correct header and markdown sections
    expect(messageJson.blocks.length).toBe(2)
    expect(messageJson.blocks[0].type).toBe('header')
    expect(messageJson.blocks[0].text.type).toBe('plain_text')
    expect(messageJson.blocks[1].type).toBe('section')
    expect(messageJson.blocks[1].text.type).toBe('mrkdwn')

    // Check that the header and markdown sections contain the correct text
    expect(messageJson.blocks[0].text.text).toBe(TITLE_INPUT)
    expect(messageJson.blocks[1].text.text).toBe(EXPECTED_SLACK_OUTPUT)
  });
});
