<script>
  import AppBar from "./AppBar/index.svelte";
  import Login from "./Login/index.svelte";

  let loggingIn = true;
  let username;

  const fetchFollowees = async (username) => {
    const userUrl = `https://api.github.com/users/${username}`
    //const followingUrl = `https://api.github.com/users/${username}/following?page=${pageNum}&per_page=100`
    try {
      const userResponse = await fetch(userUrl);
      const userJson = await userResponse.json();
      return userJson;
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (submittedUsername) => {
    username = submittedUsername;
    loggingIn = false;
    const followees = await fetchFollowees(username);
    console.log(followees);
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
