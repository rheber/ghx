<script>
  export let onLogout;
  export let username;
</script>

<div class="root">
  <div>ghx</div>
  {#if username}
    <div>
      <div>{username}</div>
      <button on:click={onLogout}>
        Log Out
      </button>
    </div>
  {/if}
</div>

<style>
  .root {
    align-items: center;
    box-shadow: 1px 1px 8px;
    box-sizing: border-box;
    display: flex;
    height: 64px;
    margin-bottom: 8px;
    justify-content: space-between;
    padding: 8px;
  }
</style>
