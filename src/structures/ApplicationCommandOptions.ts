import {
	APIApplicationCommandAutocompleteInteraction,
	APIApplicationCommandInteraction,
	APIApplicationCommandInteractionDataOption,
	APIApplicationCommandInteractionDataSubcommandGroupOption,
	APIApplicationCommandInteractionDataSubcommandOption,
	APIChatInputApplicationCommandInteractionData,
	APIInteractionDataOptionBase,
	ApplicationCommandOptionType,
	ApplicationCommandType,
	Snowflake,
} from 'discord-api-types/v10';

export class ApplicationCommandOptions {
	private options: APIApplicationCommandInteractionDataOption[] = null;
	private data: APIChatInputApplicationCommandInteractionData = null;

	constructor(message: APIApplicationCommandInteraction | APIApplicationCommandAutocompleteInteraction) {
		const data = message.data;
		if (data.type === ApplicationCommandType.ChatInput) {
			this.options = data.options;
			this.data = data;
		}
	}

	public getSubcommand(name: string, subcommandGroup?: APIApplicationCommandInteractionDataSubcommandGroupOption) {
		const option = (subcommandGroup ? subcommandGroup?.options : this.options)?.find(
			(option) => option.name === name
		);

		if (!option) return undefined;
		return option as APIApplicationCommandInteractionDataSubcommandOption;
	}

	public getSubcommandGroup(name: string) {
		const option = this.options?.find((option) => option.name === name);

		if (!option) return undefined;
		return option as APIApplicationCommandInteractionDataSubcommandGroupOption;
	}

	public getString(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption) {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.String, string>;

		return typedOption?.value;
	}

	public getInteger(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption) {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.Integer, number>;

		return typedOption?.value;
	}

	public getBoolean(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption) {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.Boolean, boolean>;

		return typedOption?.value;
	}

	public getUser(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption): typeof user {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.User, Snowflake>;
		const user = this.data.resolved.users?.[typedOption.value];

		return user;
	}

	public getMember(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption): typeof member {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.User, Snowflake>;
		const member = this.data.resolved.members?.[typedOption.value];

		return member;
	}

	public getChannel(
		name: string,
		subcommand?: APIApplicationCommandInteractionDataSubcommandOption
	): typeof channel {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.Channel, Snowflake>;
		const channel = this.data.resolved.channels?.[typedOption.value];

		return channel;
	}

	public getRole(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption): typeof role {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.Role, Snowflake>;
		const role = this.data.resolved.roles?.[typedOption.value];

		return role;
	}

	public getMentionable(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption) {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<
			ApplicationCommandOptionType.Mentionable,
			Snowflake
		>;

		return this.getUser(typedOption.value)
			? this.getUser(typedOption.value)
			: this.getRole(typedOption.value)
			? this.getRole(typedOption.value)
			: undefined;
	}

	public getNumber(name: string, subcommand?: APIApplicationCommandInteractionDataSubcommandOption) {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<ApplicationCommandOptionType.Number, number>;

		return typedOption.value;
	}

	public getAttachment(
		name: string,
		subcommand?: APIApplicationCommandInteractionDataSubcommandOption
	): typeof attachment {
		const option = (subcommand ? subcommand?.options : this.options)?.find((option) => option.name === name);

		if (!option) return undefined;
		const typedOption = option as APIInteractionDataOptionBase<
			ApplicationCommandOptionType.Attachment,
			Snowflake
		>;
		const attachment = this.data.resolved.attachments?.[typedOption.value];

		return attachment;
	}
}

