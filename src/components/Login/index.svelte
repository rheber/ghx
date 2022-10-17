<script>
  export let onLogin = () => {};
  let username;

  const handleLogin = () => {
    onLogin(username);
  };
</script>

<div class="root">
  <form>
    <label>
      Username
      <input bind:value={username}>
    </label>

    <button type="submit" on:click|preventDefault={handleLogin}>
      Login
    </button>
  </form>
</div>

<style>
  .root {
    align-content: center;
    display: flex;
    height: 100%;
    justify-content: center;
}

  form {
    align-self: center;
    display: flex;
    flex-direction: column;
  }
</style>
