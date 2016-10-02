<template>
  <div class="message-input">
    <input class="input" type="text" v-model="messageInput" v-on:keyup.enter="send" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      messageInput: '',
    };
  },
  methods: {
    ...mapActions([
      'createMessage',
    ]),
    send() {
      this.createMessage({ text: this.messageInput });
      this.messageInput = '';
    },
  },
};
</script>

<style lang="sass" scoped>
.message-input
  text-align: center

  .input
    border: 1px solid rgba(0, 0, 0, 0.15)
    border-radius: 5px
    padding: 8px 12px
    line-height: 1.25
    background-clip: padding-box
    outline: none
    color: #55595C
    width: 90%
</style>
