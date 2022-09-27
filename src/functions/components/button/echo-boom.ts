import { InteractionResponseType } from 'discord-api-types/v10';
import { respond } from '../../../util/respond';

export async function echoBoomResponse() {
	return respond({
		type: InteractionResponseType.UpdateMessage,
		data: {
			embeds: [{ description: `Boom 💥`, color: 16711680 }],
			components: [],
		},
	});
}

