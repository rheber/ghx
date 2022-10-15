<script>
  import { getContext } from 'svelte';
  const { theme, toggle } = getContext('theme');
</script>

<button on:click={toggle}>{$theme.name}</button>

  <!--
import { writable } from 'svelte/store';
const theme = writable('dark');
export { theme };
<select bind:value="{$theme}">
  <option value="dark">Dark</option>
  <option value="light">Light</option>
</select>
-->
