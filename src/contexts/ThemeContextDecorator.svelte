<script>
  import ThemeContext from "./ThemeContext.svelte";

  //export let themeName = "dark";

  console.log('using theme context decorator');
</script>

<ThemeContext>
  <slot></slot>
</ThemeContext>
