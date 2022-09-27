import { APIMessageApplicationCommandInteraction, InteractionResponseType } from 'discord-api-types/v10';
import { respond } from '../../util/respond';

export async function mockResponse(interaction: APIMessageApplicationCommandInteraction) {
	return respond({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content: (interaction.data.resolved.messages[interaction.data.target_id].content || 'No content')
				.toLowerCase()
				.split('')
				.map(function (c) {
					return Math.random() < 0.5 ? c : c.toUpperCase();
				})
				.join(''),
		},
	});
}

