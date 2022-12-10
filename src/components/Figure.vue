<template>
  <div
    class="square"
    ref="square"
    :style="{
      left: figure.coords.x + 'px',
      top: figure.coords.y + 'px',
      zIndex: figure.zIndex,
      width: figure.width + 'px',
      height: figure.height + 'px',
      borderRadius: figure.borderRadius + '%',
    }"
    @mousedown="onMouseDown"
    @mousemove="onMouseMove"
  >
    <FigureConnector
      v-for="connector in connectors"
      :key="connector.id"
      :id="id"
      :name="connector.name"
      @mousedown.stop
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import FigureConnector from './FigureConnector.vue';
export default defineComponent({
  name: 'FieldFigure',
  components: { FigureConnector },
  props: {
    id: Number,
  },
  data() {
    return {
      connectors: [
        { id: 1, name: 'top' },
        { id: 2, name: 'right' },
        { id: 3, name: 'bottom' },
        { id: 4, name: 'left' },
      ],
      activeConnector: '',
      dragging: false,
      shiftX: 0,
      shiftY: 0,
    };
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
    stopDrag() {
      this.setZ({ id: this.id, zIndex: 0 });
      this.dragging = false;
    },
    onMouseDown(event: MouseEvent) {
      this.dragging = true;
      this.setZ({ id: this.id, zIndex: 1000 });
      this.shiftX =
        event.clientX - (this.$refs.square as any).getBoundingClientRect().left;
      this.shiftY =
        event.clientY - (this.$refs.square as any).getBoundingClientRect().top;
    },
    onMouseMove(event: MouseEvent) {
      if (this.dragging) {
        this.moveAt(event.pageX, event.pageY);
      }
    },
    moveAt(pageX: number, pageY: number) {
      const newX = pageX - this.shiftX;
      const newY = pageY - this.shiftY;
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
    window.addEventListener('mouseup', this.stopDrag);
    window.addEventListener('mousedown', this.deactivateConnector);
  },

  computed: {
    ...mapGetters(['getConnectors']),
    figure() {
      return this.$store.getters.getFigureParams(this.id);
    },
  },
});
</script>

<style scoped>
.square {
  position: absolute;
  background: #0069d1;
  border: 2px solid white;
}
</style>
