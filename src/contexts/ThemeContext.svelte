<script>
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { themes as globalThemes } from '../themes.js'

  export let themes = [...globalThemes];

  let currentThemeName = themes[0].name;

  const getThemeFromName = name => themes.find(h => h.name === name);

  const Theme = writable(getThemeFromName(currentThemeName));

  setContext('theme', {
    theme: Theme,
    toggle: () => {
      let currentIndex = themes.findIndex(h => h.name === currentThemeName);
      currentThemeName = themes[currentIndex === themes.length - 1 ? 0 : (currentIndex += 1)].name;
      Theme.update(t => ({ ...t, ...getThemeFromName(currentThemeName) }));
    },
  });
</script>

<slot></slot>
