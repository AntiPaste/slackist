<template>
  <div class="message-item">
    <div class="left">
      <img alt="Avatar" class="avatar" src="/static/images/avatar.png" />
    </div>

    <div class="right">
      <div class="right-top">
        <div class="right-top-name">Kasper Koho</div>
        <div class="right-top-timestamp">{{ messageCreatedAgo }}</div>
        <div class="right-top-delete"><a href="#" v-on:click.prevent="remove">delete</a></div>
      </div>

      <div class="right-bottom">
        <a href="#" class="right-bottom-label" v-on:click.prevent="filter" v-if="message.label !== 'No label'">{{ message.label }}</a>
        <span class="right-bottom-content">{{ message.content }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions([
      'deleteMessage',
    ]),
    ...mapMutations({
      setFilter: 'FILTER_SET',
    }),
    filter() {
      this.setFilter({ filter: this.message.label });
    },
    remove() {
      this.deleteMessage(this.message.id);
    },
  },
  computed: {
    messageCreatedAgo() {
      const timestampFormat = 'ddd, DD MMM YYYY HH:mm:ss';
      return moment.utc(
        this.message.created, timestampFormat
      ).local().fromNow();
    },
  },
};
</script>

<style lang="sass" scoped>
.message-item
  display: flex
  flex-direction: row
  flex: 1
  padding: 10px 0
  min-height: min-content
  border-bottom: 1px solid #D4D4D4

  .left
    width: 60px

    .avatar
      border-radius: 5px
      width: 40px
      height: 40px

  .right
    display: flex
    flex-direction: column
    flex: 1

    &-top
      display: flex
      flex-direction: row
      align-items: center

      &-name
        margin-right: 15px
        font-size: 14px

      &-timestamp
        margin-right: 15px
        color: #9E9E9E
        font-size: 12px

      &-delete
        color: #9E9E9E
        font-size: 12px

        a:hover
          color: #757575
          text-decoration: underline

    &-bottom
      &-label
        color: #5D8C9C
        font-weight: bold
        text-decoration: none

        &:hover
          color: #35B6E2

      &-content
        word-break: break-all
        word-wrap: break-word
</style>
