import { InteractionResponseType } from 'discord-api-types/v10';
import { ApplicationCommandOptions } from '../../structures/ApplicationCommandOptions';
import { respond } from '../../util/respond';

export async function pingResponse(options: ApplicationCommandOptions) {
	const emojis = options.getBoolean('emojis');

	return respond({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			embeds: [
				{
					description: `Pong! ${emojis ? '🏓 👀 🎉' : ''}`,
				},
			],
		},
	});
}

