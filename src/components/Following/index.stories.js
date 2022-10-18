import Following from './index.svelte';

export default {
  title: 'Following',
  component: Following,
};
const Template = (args) => ({
  component: Following,
  props: args,
});

export const Component = Template.bind({});
Component.args = {
  followees: [
    {id: 4560, login: 'alice'},
    {id: 4561, login: 'carol'},
    {id: 4562, login: 'dave'},
    {id: 7890, login: 'eve'},
    {id: 7891, login: 'fred'},
    {id: 7892, login: 'george'},
    {id: 7893, login: 'harry'},
    {id: 7894, login: 'iris'},
    {id: 7895, login: 'jerry'},
    {id: 7896, login: 'karen'},
    {id: 7897, login: 'lana'},
  ],
};
