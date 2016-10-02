<template>
  <div id="app">
    <div class="container">
      <label-navigation />
      <message-list />
      <message-input />
    </div>
  </div>
</template>

<script>
import LabelNavigation from './components/LabelNavigation';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';

export default {
  components: {
    LabelNavigation,
    MessageList,
    MessageInput,
  },
};
</script>

<style>
html, body, #app, .container {
  display: flex;
  font-family: 'Open Sans', sans-serif;
  flex-direction: column;
  height: 100%;
}

html, body {
  margin-top: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
