<template>
  <line
    :id="lineName"
    :x1="getFirstConnector.x"
    :y1="getFirstConnector.y"
    :x2="getSecondConnector.x"
    :y2="getSecondConnector?.y"
    :style="style"
  />
  <circle
    class="connector"
    :cx="getFirstConnector.x"
    :cy="getFirstConnector.y"
    fill="red"
    r="5"
    :style="style"
    @click="deleteLine(id)"
  />
  <circle
    class="connector"
    :cx="getSecondConnector.x"
    :cy="getSecondConnector.y"
    fill="red"
    r="5"
    :style="style"
    @click="deleteLine(id)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'FieldLine',
  props: {
    id: Number,
    lineName: String,
  },
  data() {
    return {
      style: 'stroke: #000; stroke-width: 2;',
      connectors: this.lineName?.split('-'),
    };
  },
  methods: {
    ...mapMutations(['deleteLine']),
  },
  computed: {
    ...mapGetters(['getConnectorCoords']),
    getConnector(connector: string) {
      return this.getConnectorCoords(Number(connector[0]), connector.slice(1));
    },
    getFirstConnector() {
      const connectors = this.connectors;
      if (connectors) {
        const firstConnnector = connectors[0];
        const idLen = parseInt(firstConnnector).toString().length;
        return this.getConnectorCoords(
          Number(firstConnnector.slice(0, idLen)),
          firstConnnector.slice(idLen)
        );
      }
      return 0;
    },
    getSecondConnector() {
      const connectors = this.connectors;
      if (connectors) {
        const firstConnnector = connectors[1];
        const idLen = parseInt(firstConnnector).toString().length;
        return this.getConnectorCoords(
          Number(firstConnnector.slice(0, idLen)),
          firstConnnector.slice(idLen)
        );
      }
      return 0;
    },
  },
});
</script>

<style scoped></style>
