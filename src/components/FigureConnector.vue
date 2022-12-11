<template>
  <circle
    class="connector"
    :cx="coords.x"
    :cy="coords.y"
    :fill="isActive"
    r="15"
    :style="style"
    @click="toggleConnector"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'FigureConnector',
  props: {
    id: Number,
    name: String,
  },
  data() {
    return {
      style: 'cursor: pointer; stroke: #fff; stroke-width=2',
    };
  },
  methods: {
    ...mapMutations({
      activateConnector: 'activateConnector',
      deactivateConnector: 'deactivateConnector',
      linesConnectors: 'getLinesConnectors',
    }),
    toggleConnector() {
      const name = this.name;
      if (name) this.activateConnector(this.id + name);
    },
  },
  computed: {
    ...mapGetters({
      activeConnector: 'getActiveConnector',
      connectorCoords: 'getConnectorCoords',
    }),
    isActive() {
      const name = this.name;
      if (name) {
        return this.activeConnector === this.id + name ? '#ebebeb' : '#cfcfcf';
      }
      return '#cfcfcf';
    },
    coords() {
      return this.connectorCoords(this.id, this.name);
    },
  },
});
</script>
