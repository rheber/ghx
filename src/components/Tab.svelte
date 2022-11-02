<script>
  export let activeIdx;
  export let idx;
</script>

{#if activeIdx === idx}
  <div>
    <slot />
  </div>
{/if}
