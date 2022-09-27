import {
	APIChatInputApplicationCommandInteraction,
	ButtonStyle,
	ComponentType,
	InteractionResponseType,
	TextInputStyle,
} from 'discord-api-types/v10';
import { ApplicationCommandOptions } from '../../structures/ApplicationCommandOptions';
import { respond } from '../../util/respond';

export async function echoResponse(
	interaction: APIChatInputApplicationCommandInteraction,
	options: ApplicationCommandOptions
) {
	const myMessage = options.getSubcommand('my-message');
	const mySelection = options.getSubcommand('my-selection');

	if (myMessage) {
		return respond({
			type: InteractionResponseType.Modal,
			data: {
				title: 'Say something to echo',
				custom_id: 'echo-modal',
				components: [
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.TextInput,
								custom_id: 'message',
								label: 'Your message:',
								style: TextInputStyle.Paragraph,
								min_length: 1,
								max_length: 50,
								required: true,
							},
						],
					},
				],
			},
		});
	} else if (mySelection) {
		return respond({
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				embeds: [{ description: 'You are selecting - `Nothing`' }],
				components: [
					{
						type: ComponentType.ActionRow,
						components: [
							{
								type: ComponentType.SelectMenu,
								custom_id: 'echo-select_userId:' + interaction.member.user.id,
								options: [
									{ label: 'Ping', value: 'ping' },
									{ label: 'Wow', value: 'wow' },
									{ label: 'bot', value: 'bot' },
									{ label: 'discord', value: 'discord' },
								],
							},
						],
					},
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
}

