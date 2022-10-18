import AppBar from './index.svelte';

export default {
  title: 'AppBar',
  component: AppBar,
};
const Template = (args) => ({
  component: AppBar,
  props: args,
});

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    username: "bob",
};
