<script>
	import HomeScreen from "./components/HomeScreen.svelte";

	let ready = false;

	window.addEventListener('preloadComplete', () => {
		ready = true;
	});
</script>

{#if ready}
	<HomeScreen />
{:else}
  Loading...
{/if}