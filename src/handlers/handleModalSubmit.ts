import { APIModalSubmitInteraction, InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import { echoModalResponse } from '../functions/modals/echo-modal';
import { respond } from '../util/respond';

export async function handleModalSubmit(message: APIModalSubmitInteraction) {
	const data = message.data;

	try {
		switch (data.custom_id) {
			case 'echo-modal':
				return echoModalResponse(message);

			default:
				return respond({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: { content: '❌ - This modal is not handled.', flags: MessageFlags.Ephemeral },
				});
		}
	} catch (error) {
		return respond({
			type: InteractionResponseType.ChannelMessageWithSource,
			data: { content: 'Something went wrong.', flags: MessageFlags.Ephemeral },
		});
	}
}

