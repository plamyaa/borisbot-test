<template>
  <main class="field">
    <Figure v-for="figure in figures" :key="figure.id" :id="figure.id" />
    <Line v-for="line in connectors" :key="line.id" :connector="line" />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Figure from './Figure.vue';
import Line from './Line.vue';
export default defineComponent({
  components: { Figure, Line },
  name: 'AppField',
  methods: {
    log() {
      console.log(this.connectors);
    },
  },
  computed: {
    ...mapGetters({
      figures: 'getFigures',
      connectors: 'getConnectors',
    }),
  },
});
</script>

<style scoped>
.field {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
