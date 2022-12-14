import ThemeContextDecorator from "../src/contexts/ThemeContextDecorator.svelte";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'dark',
    clearable: false,
    list: [
      { name: 'dark', class: 'theme-dark', color: '#000099' },
      { name: 'light', class: 'theme-light', color: '#ddddaa' }
    ],
    target: '#theme-context-decorator',
  },
}

export const decorators = [() => ThemeContextDecorator];