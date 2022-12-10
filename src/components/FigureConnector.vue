<template>
  <button
    class="connector"
    :class="{ connector_active: isActive, ['connector_' + name]: true }"
    @click="toggleConnector"
  ></button>
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
  methods: {
    ...mapMutations({
      activateConnector: 'activateConnector',
      deactivateConnector: 'deactivateConnector',
      linesConnectors: 'getLinesConnectors',
    }),
    toggleConnector() {
      if (this.name) this.activateConnector(this.id + this.name);
    },
  },
  computed: {
    ...mapGetters({
      activeConnector: 'getActiveConnector',
    }),
    isActive() {
      if (this.name) {
        const name = this.name;
        // for (let line in this.linesConnectors) {
        //   if (line[0] === name || line[1] === name) return true;
        // }
        return this.activeConnector === this.id + name;
      }
      return false;
    },
  },
});
</script>

<style scoped>
.connector {
  cursor: pointer;
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: #d3d3d3;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid white;
  z-index: 100;
}
.connector_active {
  background-color: #eaeaea;
}
.connector_top {
  bottom: 100%;
}
.connector_bottom {
  top: 100%;
}
.connector_right {
  right: -100%;
}
.connector_left {
  left: -100%;
}
</style>
