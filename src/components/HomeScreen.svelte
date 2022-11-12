<script>
  import debounce from 'lodash/debounce';

  import AppBar from "./AppBar/index.svelte";
  import Following from "./Following/index.svelte";
  import Login from "./Login/index.svelte";
  import Tabs from "./Tabs.svelte";
  import Tab from "./Tab.svelte";

  const LoginStatus = Object.freeze({
    LoggedOut: 'LoggedOut',
    LoggingIn: 'LoggingIn',
    LoggedIn: 'LoggedIn',
  });
  let loginStatus = LoginStatus.LoggedOut;

  let username;

  let followees = [];
  let stars = [];
  let activeIdx = 0;

  const writeCache = async (followees, stars) => {
    const loadedCache = await preload.loadCache();
    const parsedCache = JSON.parse(loadedCache);
    let users = parsedCache.users || [];
    const cachedUser = parsedCache.users.find(u => u.login === username);
    if (cachedUser) {
      cachedUser.followees = followees;
      cachedUser.stars = stars;
    } else {
      users = [...users, { login: username, followees, stars, }];
    }
    await preload.saveCache({
      users,
    });
  };

  const debouncedWriteCache = debounce((followees, stars) => {
    writeCache(followees, stars);
  }, 500);

  $: debouncedWriteCache(followees, stars);

  const range = (start = 0, end) => {
    return [...Array(start + end).keys()].map(i => i + start);
  }

  const fetchUserData = async (username) => {
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

      // Get stars.
      let stars = [];
      const starsUrl = `https://api.github.com/users/${username}/starred?per_page=100`
      const starsResponse = await fetch(starsUrl);
      const starsJson = await starsResponse.json();
      stars = [...stars, ...starsJson];
      const starsLinkHeader = starsResponse.headers.get("link");
      console.log(starsJson);
      console.log(starsLinkHeader);

      return {
        followedUsers,
        stars,
      };
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (submittedUsername) => {
    const loadedCache = await preload.loadCache();
    const parsedCache = JSON.parse(loadedCache);
    username = submittedUsername;
    loginStatus = LoginStatus.LoggingIn;
    const userData = await fetchUserData(username);
    const fetchedFollowees = userData.followedUsers;
    fetchedFollowees.sort((a, b) => {
      return a.login.toLowerCase() < b.login.toLowerCase() ? -1 : 1;
    });

    const cachedUser = parsedCache.users.find(u => u.login === username);

    const mappedFollowees = fetchedFollowees.map(f => {
      const followee = { id: f.id, login: f.login };
      if (cachedUser) {
        const cachedFollowee = cachedUser.followees.find(
          cf => cf.id === f.id
        );
        if (cachedFollowee) {
          followee.annotation = cachedFollowee.annotation;
        }
      }
      return followee;
    });

    const mappedStars = userData.stars;

    let users = parsedCache.users || [];
    if (cachedUser) {
      cachedUser.followees = mappedFollowees;
      cachedUser.stars = [];
    } else {
      users = [...users, { login: username, followees: mappedFollowees, stars: mappedStars }];
    }

    await preload.saveCache({
      users,
    });
    followees = mappedFollowees;
    stars = mappedStars;
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
  <Tabs tabs={["Following", "Stars"]} bind:activeIdx>
    <Tab idx={0} {activeIdx}>
      <Following bind:followees={followees} />
    </Tab>
    <Tab idx={1} {activeIdx}>
      <div>stars coming soon</div>
    </Tab>
  </Tabs>
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
