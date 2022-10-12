<script>
  import AppBar from "./AppBar.svelte";
  import Login from "./Login.svelte";

  let loggingIn = true;
  let username;

  const handleLogin = (submittedUsername) => {
    username = submittedUsername;
    loggingIn = false;
  };

  const handleLogout = () => {
    loggingIn = true;
    username = undefined;
  };
</script>

<div>
  <AppBar username={username} onLogout={handleLogout} />
  {#if loggingIn}
    <Login onLogin={handleLogin} />
  {/if}
</div>

<style>
  div {
    height: 100%;
    width: 100%;
  }
</style>
