import { writeFileSync, mkdirSync } from 'fs';
import { json } from '@sveltejs/kit';

let message = 'initial';

export async function POST({ request }) {
	const { image } = await request.json();

	mkdirSync('./images', { recursive: true });
	writeFileSync(
		'./images/' + Date.now() + '.jpg',
		image.replace(/^data:image\/jpeg;base64,/, ''),
		'base64url'
	);

	return json({ message });
}

export async function GET({ request }) {
	return json({ message });
}

export async function PATCH({ request }) {
	const { message: newMessage } = await request.json();
	
	message = newMessage;

	return json({});
}
