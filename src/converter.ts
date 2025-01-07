const slackifyMarkdown = require('slackify-markdown');
import {SlackBlock, SlackFormat} from "./types";

export default class Converter {

  static async convertMarkdownToSlack(settings: any, title: string, markdown: string): Promise<string> {
    const result = await slackifyMarkdown(markdown);

    // Replace any quotes with nothing and carridge returns with a return string equivalent
    const resultA = result.replace(/['"]+/g, '')
    const resultB = resultA.replace(/^\s*$/g, '\n')

    // Split the string into 3000 character chunks, the limit for slack md sections
    const splitResult = resultB.match(/[\s\S]{1,3000}/g) || [];

    let slackFormat : SlackFormat = {
      "blocks": []
    }

    const header : SlackBlock = {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": title
      }
    }

    slackFormat.blocks.push(header)

    splitResult.forEach((element : string) => {
      const section =   {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": element
        }
      }

      slackFormat.blocks.push(section)
    })

    return `${settings.slackBlockKitBuilderURL}#${encodeURIComponent(JSON.stringify(slackFormat))}`  }
}
