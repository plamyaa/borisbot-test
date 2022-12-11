<template>
  <main class="field">
    <svg class="box" width="100vw" height="100vh">
      <Figure v-for="figure in figures" :key="figure.id" :id="figure.id" />
      <Line
        v-for="line in lines"
        :key="line.id"
        :id="line.id"
        :lineName="line.lineName"
      />
    </svg>
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
  computed: {
    ...mapGetters({
      figures: 'getFigures',
      lines: 'getLines',
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
