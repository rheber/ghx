<script>
  export let tabs = [];

  let activeIdx = 0;

  const setActiveIdx = (newIdx) => {
    activeIdx = newIdx;
  };
</script>

<div>
  <div class="headers">
    {#each tabs as tab, idx (tab)}
      <div
        class="header"
        class:inactive={idx !== activeIdx}
        on:click="{() => setActiveIdx(idx)}"
        on:keypress="{() => setActiveIdx(idx)}"
      >
        {tab}
      </div>
    {/each}
  </div>
  <slot />
</div>

<style>
  .header {
    cursor: default;
    text-align: center;
    width: 100%;
  }

  .header.inactive {
    color: gray;
    cursor: pointer;
  }

  .headers {
    box-shadow: 1px 1px 8px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
</style>
