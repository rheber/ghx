<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
  import AppBar from './index.svelte';
</script>

<Meta title="AppBar" component={AppBar}/>

<Template let:args>
  <AppBar {...args}/>
</Template>

<Story name="Primary" />
<Story name="Logged In" args={{username: "bob"}}/>
