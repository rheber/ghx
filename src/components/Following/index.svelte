<script>
  export let followees = [];
</script>

<div class="root">
  {#each followees as followee, idx (followee.id)}
    <div class="item">
      <div class="index">{idx + 1}</div>
      <div class="spacer" />
      <div>{followee.login}</div>
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

  .index {

  }

  .spacer {
    flex-grow: 1;
  }
</style>
