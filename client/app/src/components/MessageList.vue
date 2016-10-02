<template>
  <div class="message-list" ref="messageList">
    <template v-for="message in messages">
      <message-item v-bind:message="message" />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MessageItem from './MessageItem';

export default {
  components: {
    MessageItem,
  },
  computed: {
    ...mapGetters([
      'messages',
    ]),
  },
  methods: {
    scrollToBottom() {
      const node = this.$refs.messageList;
      node.scrollTop = node.scrollHeight;
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
};
</script>

<style lang="sass" scoped>
.message-list
  display: flex
  flex-direction: column
  flex: 1
  overflow: auto
  margin: 0 auto
  width: 80%

  &::-webkit-scrollbar
    -webkit-appearance: none

  &::-webkit-scrollbar:vertical
    width: 11px

  &::-webkit-scrollbar:horizontal
    height: 11px

  &::-webkit-scrollbar-thumb
    border-radius: 8px
    border: 2px solid #FFFFFF
    background-color: rgba(0, 0, 0, .5)

  &::-webkit-scrollbar-track
    background-color: #FFFFFF
    border-radius: 8px

  .message-item:last-child
    border-bottom: none
</style>
