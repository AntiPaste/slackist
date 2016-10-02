<template>
  <div class="label-navigation">
    <label-navigation-item v-bind:label="label" v-bind:count="count" v-for="(count, label) in labels" />
    <label-navigation-item label="Clear filter" isClear />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LabelNavigationItem from './LabelNavigationItem';

export default {
  components: {
    LabelNavigationItem,
  },
  computed: {
    ...mapGetters({
      labels: 'labels',
    }),
  },
  methods: {
    ...mapMutations({
      setFilter: 'FILTER_SET',
    }),
    clearFilter() {
      this.setFilter({ label: null });
    },
  },
};
</script>

<style lang="sass" scoped>
.label-navigation
  display: flex
  flex-direction: row
  padding: 10px 0
  border-bottom: 1px solid #D1D1D1
</style>
