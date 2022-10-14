<script>
  import AppBar from "./AppBar/index.svelte";
  import Login from "./Login/index.svelte";

  let loggingIn = true;
  let username;

  const range = (start = 0, end) => {
    return [...Array(start + end).keys()].map(i => i + start);
  }

  const fetchFollowees = async (username) => {
    const userUrl = `https://api.github.com/users/${username}`
    try {
      // Get user data.
      const userResponse = await fetch(userUrl);
      const userJson = await userResponse.json();
      console.log(userJson);

      // Get followee data.
      const followingAmount = userJson.following;
      let followedUsers = [];
      const pageNums = range(1, Math.floor(followingAmount / 100));
      for (let pageNum of pageNums) {
        const followingUrl = `https://api.github.com/users/${username}/following?page=${pageNum}&per_page=100`;
        const followingResponse = await fetch(followingUrl);
        const followingJson = await followingResponse.json();
        followedUsers = [...followedUsers, ...followingJson];
      }

      return followedUsers;
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (submittedUsername) => {
    username = submittedUsername;
    loggingIn = false;
    const followees = await fetchFollowees(username);
    followees.sort((a, b) => {
      return a.login.toLowerCase() < b.login.toLowerCase() ? -1 : 1;
    });
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
