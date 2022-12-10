<template>
  <svg
    class="svg"
    :style="{
      left: Math.min(connector?.x1, connector?.x2),
      top: Math.min(connector?.y1, connector?.y2),
    }"
  >
    <line
      :x1="connector?.x1"
      :y1="connector?.y1"
      :x2="connector?.x2"
      :y2="connector?.y2"
      style="stroke: rgb(255, 0, 0); stroke-width: 2"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'FieldLine',
  props: {
    connector: Object,
  },
  methods: {},
  computed: {
    ...mapGetters({}),
  },
});
</script>

<style scoped>
.svg {
  position: absolute;
}
</style>
