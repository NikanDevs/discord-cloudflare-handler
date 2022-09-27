import { APIInteractionResponse } from 'discord-api-types/v10';

export const respond = (response: APIInteractionResponse) =>
	new Response(JSON.stringify(response), { headers: { 'content-type': 'application/json' } });

