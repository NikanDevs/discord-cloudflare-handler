import { APIModalSubmitInteraction, InteractionResponseType } from 'discord-api-types/v10';
import { respond } from '../../util/respond';

export async function echoModalResponse(interaction: APIModalSubmitInteraction) {
	const data = interaction.data;
	const message = data.components[0].components.find((c) => c.custom_id === 'message').value;

	return respond({
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			embeds: [{ description: message }],
		},
	});
}

