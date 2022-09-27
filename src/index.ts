import { handleRequest } from './handlers/handleRequest';

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

