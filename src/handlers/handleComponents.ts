import {
	isMessageComponentButtonInteraction,
	isMessageComponentSelectMenuInteraction,
} from 'discord-api-types/utils/v10';
import { APIMessageComponentInteraction, InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import { echoBoomResponse } from '../functions/components/button/echo-boom';
import { echoSelectResponse } from '../functions/components/selectmenu/echo-select';
import { respond } from '../util/respond';

export async function handleComponent(message: APIMessageComponentInteraction): Promise<Response> {
	const data = message.data;

	if (
		!data.custom_id
			.split('_')
			.find((c) => c.startsWith('userId:'))
			.endsWith(message.member.user.id)
	)
		return respond({
			type: InteractionResponseType.ChannelMessageWithSource,
			data: { content: '❌ - You cannot use this.', flags: MessageFlags.Ephemeral },
		});

	if (isMessageComponentSelectMenuInteraction(message)) {
		switch (data.custom_id.split('_')[0]) {
			case 'echo-select':
				return await echoSelectResponse(message);

			default:
				return respond({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: { content: '❌ - This select-menu is not handled.', flags: MessageFlags.Ephemeral },
				});
		}
	}

	if (isMessageComponentButtonInteraction(message)) {
		switch (data.custom_id.split('_')[0]) {
			case 'echo-boom':
				return echoBoomResponse();

			default:
				return respond({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: { content: '❌ - This button is not handled.', flags: MessageFlags.Ephemeral },
				});
		}
	}
}

