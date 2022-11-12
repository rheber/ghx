<script>
  export let stars = [];
</script>

<div class="root">
  {#each stars as star, idx (star.id)}
    <div class="item">
      <div>{idx + 1}</div>
      <div class="spacer" />
      <div>{star.full_name}</div>
      <div class="spacer" />
      <div>{star.description}</div>
      <div class="spacer" />
      <input bind:value={star.annotation} />
    </div>
  {/each}
</div>

<style>
  .root {
    box-sizing: border-box;
    height: 100%;
    padding: 0 5%;
    width: 100%;
  }

  .item {
    align-items: center;
    box-shadow: 1px 1px 8px;
    box-sizing: border-box;
    display: flex;
    height: 64px;
    margin-bottom: 8px;
    padding: 8px;
    width: 100%;
  }

  .spacer {
    flex-grow: 1;
  }
</style>
