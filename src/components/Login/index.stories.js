import Login from './index.svelte';

export default {
  title: 'Login',
  component: Login,
};
const Template = (args) => ({
  component: Login,
  props: args,
});

export const Component = Template.bind({});
