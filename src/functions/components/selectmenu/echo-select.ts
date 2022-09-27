import {
	APIMessageComponentSelectMenuInteraction,
	ButtonStyle,
	ComponentType,
	InteractionResponseType,
} from 'discord-api-types/v10';
import { respond } from '../../../util/respond';

export async function echoSelectResponse(interaction: APIMessageComponentSelectMenuInteraction) {
	const selection = interaction.data.values[0];

	return respond({
		type: InteractionResponseType.UpdateMessage,
		data: {
			embeds: [{ description: `You selected - \`${selection}\`` }],
			components: [
				{
					type: ComponentType.ActionRow,
					components: [
						{
							type: ComponentType.Button,
							custom_id: 'echo-boom_userId:' + interaction.member.user.id,
							style: ButtonStyle.Secondary,
							emoji: { name: '💥' },
						},
					],
				},
			],
		},
	});
}

