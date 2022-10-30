<script lang="ts">
	import { onMount } from 'svelte';

	let messageBinding: string = '';

	onMount(async () => {
		const response = await (await fetch('/update', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})).json();
		messageBinding = response.message;
	});

	async function update() {
		await fetch('/update', {
			method: 'PATCH',
			body: JSON.stringify({ message: messageBinding }),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<input maxlength="108" bind:value={messageBinding} on:input={update} type="text" />

<style>
	input {
		padding: 1rem;
		width: 90vw;
		border-width: 0.2rem;
		border-color: orange;
		margin: 2rem;
	}
</style>
