<script>
  import AppBar from "./AppBar/index.svelte";
  import Following from "./Following/index.svelte";
  import Login from "./Login/index.svelte";

  const LoginStatus = Object.freeze({
    LoggedOut: 'LoggedOut',
    LoggingIn: 'LoggingIn',
    LoggedIn: 'LoggedIn',
  });
  let loginStatus = LoginStatus.LoggedOut;

  let username;

  let followees = [];

  const range = (start = 0, end) => {
    return [...Array(start + end).keys()].map(i => i + start);
  }

  const fetchFollowees = async (username) => {
    const userUrl = `https://api.github.com/users/${username}`
    try {
      // Get user data.
      const userResponse = await fetch(userUrl);
      const userJson = await userResponse.json();

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
    const loadedCache = await preload.loadCache();
    username = submittedUsername;
    loginStatus = LoginStatus.LoggingIn;
    const fetchedFollowees = await fetchFollowees(username);
    fetchedFollowees.sort((a, b) => {
      return a.login.toLowerCase() < b.login.toLowerCase() ? -1 : 1;
    });
    const mappedFollowees = fetchedFollowees.map(f => {
      return { id: f.id, login: f.login };
    });
    await preload.saveCache({
      ...loadedCache,
      users: [
        {
          ...loadedCache.users,
          [username]: { followees: mappedFollowees },
        },
      ]
    });
    followees = mappedFollowees;
    loginStatus = LoginStatus.LogedIn;
  };

  const handleLogout = () => {
    loginStatus = LoginStatus.LoggedOut;
    username = undefined;
  };
</script>

<div class="root">
  <AppBar username={username} onLogout={handleLogout} />
  {#if loginStatus === LoginStatus.LoggedOut}
    <Login onLogin={handleLogin} />
  {:else if loginStatus === LoginStatus.LoggingIn}
    <div class="logging-in">
      <div class="logging-in-inner">
        Logging in...
      </div>
    </div>
  {:else}
    <Following followees={followees} />
  {/if}
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .logging-in {
    align-items:center;
    display: flex;
    height: 100%;
    justify-content: center;
  }

  .logging-in-inner {
    align-items:center;
    align-self:stretch;
    display: flex;
  }
</style>
