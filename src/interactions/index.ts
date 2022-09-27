import { echoCommand } from './echo';
import { mockCommand } from './mock';
import { pingCommand } from './ping';

export const interactions = {
	ping: pingCommand,
	echo: echoCommand,
	Mock: mockCommand,
};

