<template>
  <svg ref="box" class="box" width="100vw" height="100vh">
    <rect
      :width="figure.width"
      :height="figure.height"
      :style="cursor"
      style="fill: #0069d1; stroke: #fff; stroke-width: 2"
      :x="figure.coords.x"
      :y="figure.coords.y"
      @mousedown="drag"
      @mouseup="drop"
    />
    <FigureDeleteButton
      :x="figure.coords.x + figure.width"
      :y="figure.coords.y"
      :id="id"
    />
    <FigureConnector
      v-for="connector in getDefaultConnectors"
      :key="connector.id"
      :id="id"
      :name="connector.name"
      @mousedown.stop
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import FigureConnector from './FigureConnector.vue';
import FigureDeleteButton from './FigureDeleteButton.vue';
export default defineComponent({
  name: 'FieldFigure',
  components: { FigureConnector, FigureDeleteButton },
  props: {
    id: Number,
  },
  data() {
    return {
      dragOffsetX: 0,
      dragOffsetY: 0,
    };
  },
  computed: {
    ...mapGetters(['getDefaultConnectors', 'getConnectors']),
    figure() {
      return this.$store.getters.getFigureParams(this.id);
    },
    cursor() {
      return `cursor: ${this.dragOffsetX ? 'grabbing' : 'grab'}`;
    },
  },
  methods: {
    ...mapMutations({
      setZ: 'setFigureZIndex',
    }),
    ...mapMutations([
      'moveFigure',
      'deactivateConnector',
      'moveConnectorsGroup',
    ]),
    drag({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
      this.dragOffsetX = offsetX - this.figure.coords.x;
      this.dragOffsetY = offsetY - this.figure.coords.y;
      (this.$refs.box as HTMLElement).addEventListener('mousemove', this.move);
    },
    drop() {
      this.dragOffsetX = this.dragOffsetY = 0;
      (this.$refs.box as HTMLElement).removeEventListener(
        'mousemove',
        this.move
      );
    },
    move({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
      const newX = offsetX - this.dragOffsetX;
      const newY = offsetY - this.dragOffsetY;
      this.moveFigure({
        id: this.id,
        x: newX,
        y: newY,
      });
      this.moveConnectorsGroup({
        id: this.id,
        width: this.figure.width,
        height: this.figure.height,
        figurePosition: { x: newX, y: newY },
      });
    },
  },
  mounted() {
    window.addEventListener('mouseup', this.drop);
    window.addEventListener('mousedown', this.deactivateConnector);
  },
  beforeUnmount() {
    window.removeEventListener('mouseup', this.drop);
    window.removeEventListener('mousedown', this.deactivateConnector);
  },
});
</script>

<style scoped>
.box {
  position: absolute;
}
</style>
