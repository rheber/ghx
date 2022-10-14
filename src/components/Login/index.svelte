<script>
  export let onLogin = () => {};
  let username;

  const handleLogin = () => {
    onLogin(username);
  };
</script>

<form>
  <label>
    Username
    <input bind:value={username}>
  </label>

  <button type="submit" on:click|preventDefault={handleLogin}>
    Login
  </button>
</form>
