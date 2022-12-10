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
    <button
      class="square__connector square__connector_up"
      :id="'up' + id"
      :style="{
        backgroundColor: activeConnector === 'up' + id ? '#eaeaea' : '#d3d3d3',
      }"
      @click="toggleConnector"
      @mousedown.stop
    ></button>
    <div
      class="square__connector square__connector_right"
      :id="'right' + id"
      :style="{
        backgroundColor:
          activeConnector === 'right' + id ? '#eaeaea' : '#d3d3d3',
      }"
      @click="toggleConnector"
      @mousedown.stop
    ></div>
    <div
      class="square__connector square__connector_down"
      :id="'down' + id"
      :style="{
        backgroundColor:
          activeConnector === 'down' + id ? '#eaeaea' : '#d3d3d3',
      }"
      @click="toggleConnector"
      @mousedown.stop
    ></div>
    <div
      class="square__connector square__connector_left"
      :id="'left' + id"
      :style="{
        backgroundColor:
          activeConnector === 'left' + id ? '#eaeaea' : '#d3d3d3',
      }"
      @click="toggleConnector"
      @mousedown.stop
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'FieldFigure',
  props: {
    id: Number,
  },
  data() {
    return {
      activeConnector: '',
      dragging: false,
      shiftX: 0,
      shiftY: 0,
    };
  },
  methods: {
    ...mapMutations({
      setCoords: 'setFigureCoords',
      setZ: 'setFigureZIndex',
      activateConnector: 'activateConnector',
      deactivateConnector: 'deactivateConnector',
    }),
    toggleConnector(event: Event) {
      const target = event.target as HTMLElement;
      if (target.id === this.activeConnector) {
        this.activeConnector = '';
        this.deactivateConnector();
      } else {
        this.activeConnector = target.id;
        this.activateConnector({
          x1: this.figure.coords.x + this.figure.width / 2,
          y1: this.figure.coords.y,
        });
      }
    },
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
      this.setCoords({
        id: this.id,
        x: pageX - this.shiftX,
        y: pageY - this.shiftY,
      });
    },
  },
  mounted() {
    window.addEventListener('mouseup', this.stopDrag);
  },

  computed: {
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
.square__connector {
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
}
.square__connector_up {
  bottom: 100%;
}
.square__connector_down {
  top: 100%;
}
.square__connector_right {
  right: -100%;
}
.square__connector_left {
  left: -100%;
}
</style>
