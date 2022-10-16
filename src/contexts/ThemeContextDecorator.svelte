<script>
  import ThemeContext from "./ThemeContext.svelte";

  //export let themeName = "dark";

  console.log('using theme context decorator');
</script>

<div id="theme-context-decorator">
  <ThemeContext>
    <slot></slot>
  </ThemeContext>
</div>
