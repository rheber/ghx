<script>
  export let stars = [];
</script>

<div class="root">
  {#each stars as star, idx (star.id)}
    <div class="item">
      <div>{idx + 1}</div>
      <div class="name"><strong>{star.full_name}</strong></div>
      <div class="spacer" />
      <div class="description">{star.description}</div>
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

  .name {
    white-space: nowrap;
    margin: 0 1em;
  }

  .description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
