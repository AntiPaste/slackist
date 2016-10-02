<template>
  <div class="label-navigation-item">
    <a href="#" v-on:click.prevent="filter">{{ label }}</a>
    <span class="count" v-if="!isClear">({{ count }})</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
    },
    isClear: {
      type: Boolean,
    },
  },
  methods: {
    ...mapMutations({
      setFilter: 'FILTER_SET',
    }),
    filter() {
      if (this.isClear) {
        this.setFilter({ filter: null });
        return;
      }

      this.setFilter({ filter: this.label });
    },
  },
};
</script>

<style lang="sass" scoped>
.label-navigation-item
  text-align: center
  flex: 1

  .count
    color: #9E9E9E

  a
    color: #5D8C9C
    font-weight: bold

    &:hover
      color: #35B6E2
</style>
