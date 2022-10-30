<script lang="ts">
	import { getDevices, getMedia } from '../services/webcam';
	import { onMount } from 'svelte';

	let devices: MediaDeviceInfo[] = [];

	onMount(async () => {
		devices = (await getDevices()).filter((d) => d.kind == 'videoinput');
	});

	let started = false;
	let video: HTMLVideoElement;
	let selector: HTMLSelectElement;

	let message = '';

	async function start() {
		const stream = await getMedia({
			video: {
				deviceId: selector.value
			}
		});
		video.srcObject = stream;
		video.play();

		const canvas = document.createElement('canvas');

		async function makeScreenshot() {
			const ratio = video.videoWidth / video.videoHeight;
			const w = video.videoWidth - 100;
			const h = parseInt(w / ratio, 10);
			canvas.width = w;
			canvas.height = h;

			let ctx = canvas.getContext('2d')!;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			const data = canvas.toDataURL('image/jpeg');

			const response = await fetch('/update', {
				method: 'POST',
				body: JSON.stringify({ image: data }),
				headers: {
					'content-type': 'application/json'
				}
			});

			const res = await response.json();
			message = res.message;
		}

		setInterval(() => {
			makeScreenshot();
		}, 1000);
	}
</script>

{#if started}
	<video bind:this={video} autoplay />
	<h1>
		{message}
	</h1>
{:else}
	<select bind:this={selector}>
		{#each devices as device}
			<option value={device.deviceId}>{device.label}</option>
		{/each}
	</select>

	<button
		on:click={() => {
			started = true;
			start();
		}}>Start</button
	>
{/if}

<style>
	video {
		width: 100vw;
		height: 100vh;
		object-fit: cover;
		position: relative;
		background: no-repeat;
		background-size: cover;
	}

	h1 {
		position: absolute;
		left: 50%;
		top: 60%;
		transform: translate(-50%, -50%);
		font-size: 5vw;
		color: white;
		text-shadow: 5px 2px 30px black;
	}
</style>
