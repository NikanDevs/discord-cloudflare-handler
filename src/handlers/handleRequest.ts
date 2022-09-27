import {
	APIApplicationCommandInteraction,
	APIMessageComponentInteraction,
	APIModalSubmitInteraction,
	InteractionResponseType,
	InteractionType,
} from 'discord-api-types/v10';
import { APIPingInteraction } from 'discord-api-types/payloads/v10/_interactions/ping';
import { respond } from '../util/respond';
import { handleApplicationCommand } from './handleApplicationCommand';
import { handleComponent } from './handleComponents';
import { handleModalSubmit } from './handleModalSubmit';

export async function handleRequest(request: Request): Promise<Response> {
	// If the sent request is from the worker domain
	if (!request.headers.get('X-Signature-Ed25519') || !request.headers.get('X-Signature-Timestamp'))
		return Response.redirect('https://youtu.be/dQw4w9WgXcQ'); // 👻

	if (!(await verify(request))) return new Response('Could not verify', { status: 401 });

	const message = (await request.json()) as
		| APIPingInteraction
		| APIApplicationCommandInteraction
		| APIMessageComponentInteraction
		| APIModalSubmitInteraction;

	switch (message.type) {
		case InteractionType.Ping:
			return respond({ type: InteractionResponseType.Pong });
		case InteractionType.ApplicationCommand:
			return await handleApplicationCommand(message);
		case InteractionType.MessageComponent:
			return await handleComponent(message);
		case InteractionType.ModalSubmit:
			return await handleModalSubmit(message);

		default:
			return;
	}
}

function hex2bin(hex: string) {
	const buf = new Uint8Array(Math.ceil(hex.length / 2));
	for (var i = 0; i < buf.length; i++) {
		buf[i] = parseInt(hex.substr(i * 2, 2), 16);
	}
	return buf;
}

const PUBLIC_KEY = crypto.subtle.importKey(
	'raw',
	hex2bin(DISCORD_PUBLIC_KEY),
	{
		name: 'NODE-ED25519',
		namedCurve: 'NODE-ED25519',
	},
	true,
	['verify']
);

const encoder = new TextEncoder();
export async function verify(request: Request) {
	const signature = hex2bin(request.headers.get('X-Signature-Ed25519')!);
	const timestamp = request.headers.get('X-Signature-Timestamp');
	const unknown = await request.clone().text();

	return await crypto.subtle.verify(
		'NODE-ED25519',
		await PUBLIC_KEY,
		signature,
		encoder.encode(timestamp + unknown)
	);
}

