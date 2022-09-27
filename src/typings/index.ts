import { APIApplicationCommand } from 'discord-api-types/v10';

export type InteractionOptions = {
	name: string;
	description: string;
	dev?: boolean;
} & APIApplicationCommand;

