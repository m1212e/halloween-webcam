<script lang="ts">
	import { browser } from '$app/environment';

	import "../normalize.css"

	if (browser) {
		let mouseTimer = null;
		let cursorVisible = true;

		function disappearCursor() {
			mouseTimer = null;
			document.body.style.cursor = 'none';
			cursorVisible = false;
		}

		document.onmousemove = function () {
			if (mouseTimer) {
				window.clearTimeout(mouseTimer);
			}
			if (!cursorVisible) {
				document.body.style.cursor = 'default';
				cursorVisible = true;
			}
			mouseTimer = window.setTimeout(disappearCursor, 5000);
		};
	}
</script>

<slot />
