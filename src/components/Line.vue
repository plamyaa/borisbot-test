<template>
  <line
    :id="lineName"
    :x1="getFirstConnector.x"
    :y1="getFirstConnector.y"
    :x2="getSecondConnector.x"
    :y2="getSecondConnector?.y"
    style="stroke: rgb(255, 0, 0); stroke-width: 2; z-index: 500"
  />
  <button>x</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'FieldLine',
  props: {
    id: Number,
    lineName: String,
  },
  data() {
    return {
      connectors: this.lineName?.split('-'),
    };
  },
  methods: {},
  computed: {
    ...mapGetters(['getConnectorCoords']),
    getConnector(connector: string) {
      return this.getConnectorCoords(Number(connector[0]), connector.slice(1));
    },
    getFirstConnector() {
      if (this.connectors) {
        const firstConnnector = this.connectors[0];

        return this.getConnectorCoords(
          Number(firstConnnector[0]),
          firstConnnector.slice(1)
        );
      }
      return 0;
    },
    getSecondConnector() {
      if (this.connectors) {
        const firstConnnector = this.connectors[1];
        return this.getConnectorCoords(
          Number(firstConnnector[0]),
          firstConnnector.slice(1)
        );
      }
      return 0;
    },
  },
});
</script>

<style scoped></style>
